// 导航条控制器
function NavbarCtrl($scope, $http, $state, toastr) {
	$http({
		url : "users/header"
	}).success(function(response) {
		if (response.status == "success") {
			if (response.msg[0].status == "1") {
				$scope.user = {
					isShowLogin : false,
					isShowStore : true,
					isShowUser : true
				};
			} else {
				$scope.user = {
					isShowStore : false,
					isShowLogin : false,
					isShowUser : true
				}
			}
		} else {
			$scope.user = {
				isShowLogin : true,
				isShowStore : false,
				isShowUser : false
			}
		}
		$scope.nickname = response.msg[0].nickname;
		if (response.msg[0].money != null) {
			$scope.money = "余额：" + response.msg[0].money + " 元";
		} else {
			$scope.money = "余额：0.0 元";
		}
	});
	// 显示/隐藏下拉菜单
	$scope.menu_show = function() {
		$("#user_menu").show();
	}
	$scope.menu_hide = function() {
		$("#user_menu").hide();
	}
	// 登录注册框
	$scope.login_signup = function(ls) {
		$scope.login = true;
		$scope.log = false;
		$("#login").modal();
		if (ls == "login") {
			$scope.login = true;
			$scope.user.act = "login";
		} else {
			$scope.login = false;
			$scope.user.act = "signup";
		}
	}
	// 提交登录/注册表单
	$scope.submits = function() {
		$http({
			url : "users/login",
			params : $scope.user
		}).success(function(response) {
			if (response.status == "success") {
				$('.close').click();
				$state.go('index', location.reload('index'));
			} else {
				$scope.ansInfo = response.msg;
			}
		});
	};
	// 安全退出
	$scope.out = function() {
		$http({
			url : "users/out"
		}).success(function(response) {
			if (response) {
				$state.go('index', location.reload('index'));
			}
		});
	};
	// 动态检验用户名
	$scope.proof = function() {
		$scope.sucInfo = "";
		if ($scope.user.user_name != null) {
			$http({
				url : "users/proof",
				params : $scope.user
			}).success(function(response) {
				$scope.log = false;
				$scope.color = "blue";
				if (response.status == "success") {
					if ($scope.user.act == "login") {
						$scope.sucInfo = "✔";
					} else if ($scope.user.act == "signup") {
						$scope.sucInfo = "用户名已存在！";
						$scope.log = true;
						$scope.color = "red";
					}
				} else {
					if ($scope.user.act == "login") {
						$scope.sucInfo = "用户名不存在！";
						$scope.log = true;
						$scope.color = "red";
					} else if ($scope.user.act == "signup") {
						$scope.sucInfo = "✔";
					}
				}
			});
		}
	};
}
// 首页控制器
function HomeCtrl($scope, $http, $state) {
	// 初始化首页商品数据
	$http.post("items/home_item").success(function(response) {
		$scope.list = true;
		// $scope.items = response;
		var vm = $scope.vm = {};
		vm.items = response;
		// 购物车
		vm.cart = {
			lines : []
		};
		vm.addToCart = function addToCart(item) {
			if (!item.item_id) {
				return;
			}
			var line = _.findWhere(vm.cart.lines, {
				item_id : item.item_id
			});
			if (!line) {
				line = _.extend({}, item, {
					quantity : 1
				});
				vm.cart.lines.push(line);
			} else {
				++line.quantity;
			}
		};
		vm.cartCount = function() {
			return _.reduce(vm.cart.lines, function(memo, line) {
				return memo + line.quantity
			}, 0);
		};
		vm.cartTotal = function() {
			return _.reduce(vm.cart.lines, function(memo, line) {
				return memo + line.item_price * line.quantity
			}, 0);
		};

		vm.incrementQuantity = function(line) {
			line.quantity++;
		};
		vm.decrementQuantity = function(line) {
			if (line.quantity <= 0)
				return;
			--line.quantity;
		};
		vm.removeFromCart = function(line) {
			vm.cart.lines = _.reject(vm.cart.lines, function(item) {
				return line.item_id === item.item_id;
			});
		};

	});
	// 切换商品显示方式
	$scope.list_click = function() {
		$scope.list = !$scope.list;
	}
	// 显示/隐藏下拉菜单
	$scope.shop_show = function() {
		$("#shop_cart").show();
	}
	$scope.shop_hide = function() {
		$("#shop_cart").hide();
	}

	// 购买
	$scope.buy_item = function(item_id) {
		$http({
			url : "orders/add_order",
			params : {
				item_id : item_id
			}
		}).success(function(response) {
			if (response.status == "not_login") {
				$("#no_login").modal();
			} else if (response.status == "success") {
				alert(response.msg);
				// $state.go('index.order');
			} else {
				alert(response.msg);
			}
		});
	};

}
// 我的店铺
function StoreCtrl($scope, $http) {
	// 初始化我的店铺页面数据
	$http.post("stores/my_store").success(function(response) {
		$scope.stores = {
			store_name : response[0].store_name,
			store_id : response[0].store_id,
			money : response[0].money,
			road_money : response[0].road_money
		}
	});
	// 编辑框（新增与修改）
	$scope.edit_item = function(item_id) {
		$scope.edit = true;
		$("#edit").modal();
		if (item_id == 'new') {
			$scope.edit = true;
			$scope.item = {
				item_id : "",
				item_name : "",
				item_price : ""
			}
		} else {
			$scope.edit = false;
			$http.post("items/current_goods", item_id).success(
					function(response) {
						$scope.item = {
							item_id : response[0].item_id,
							item_name : response[0].item_name,
							item_price : response[0].item_price
						}
					});
		}
	};
	// 提交表单(添加、修改)
	$scope.submits = function(action) {
		if (action != "edit") {
			// 删除操作时action是一个ID
			$scope.item = {
				item_id : action
			}
			action = null;
		}
		// 添加或修改时action是字符串edit
		$scope.item.act = action;
		$http.post("items/edit_goods", $scope.item).success(function(response) {
			if (response.status == "success") {
				alert(response.msg);
				location.reload('index.store.item_list');
			} else {
				alert(response.msg);
			}
		});
	};
}
// 我的商品信息
function Item_listCtrl($scope, $http) {
	// 获取我的商品信息
	$http.get("items/my_item").success(function(response) {
		$scope.items = response;
	});
	// 删除商品
	$scope.del_item = function(item_id) {
		$http({
			url : "orders/del_item",
			params : {
				item_id : item_id
			}
		}).success(function(response) {
			if (response.status == "success") {
				alert(response.msg);
				location.reload('index.store.item_list');
			} else {
				alert(response.msg);
			}
		});
	};
}
// 我的出售订单信息
function Order_listCtrl($scope, $http) {
	// 获取我的出售订单信息
	$http.get("orders/sell_orders").success(function(response) {
		$scope.orders = response;
	});
	// 发货
	$scope.send_goods = function(order_id) {
		$http({
			url : "orders/send_goods",
			params : {
				order_id : order_id
			}
		}).success(function(response) {
			if (response.status == "success") {
				alert(response.msg);
				location.reload('index.store.order_list');
			} else {
				alert(response.msg);
			}
		});
	};
}
// 我的购买订单页面控制器
function MyOrderCtrl($scope, $http) {
	// 初始化我的订单页面数据
	$http.get("orders/my_order").success(function(response) {
		$scope.orders = response;
	});
	// 支付订单
	$scope.pay_order = function(order_id) {
		$http({
			url : "orders/pay_order",
			params : {
				order_id : order_id
			}
		}).success(function(response) {
			if (response.status == "failure") {
				$("#no_money").modal();
			} else if (response.status == "success") {
				alert(response.msg);
				location.reload('index.order');
			}
		});
	};
	// 取消订单
	$scope.cancel_order = function(order_id) {
		$http({
			url : "orders/cancel_order",
			params : {
				order_id : order_id
			}
		}).success(function(response) {
			if (response.status == "success") {
				alert(response.msg);
				location.reload('index.order');
			} else {
				alert(response.msg);
			}
		});
	};
	// 删除订单
	$scope.del_order = function(order_id) {
		$http({
			url : "orders/del_order",
			params : {
				order_id : order_id
			}
		}).success(function(response) {
			if (response.status == "success") {
				alert(response.msg);
				location.reload('index.order');
			} else {
				alert(response.msg);
			}
		});
	};
	// 确认收货
	$scope.affirm_goods = function(order_id) {
		$http({
			url : "orders/affirm_goods",
			params : {
				order_id : order_id
			}
		}).success(function(response) {
			if (response.status == "success") {
				alert(response.msg);
				location.reload('index.order');
			} else {
				alert(response.msg);
			}
		});
	};
}


//定义控制器View1Controller,
app.controller('View1Controller',['$rootScope','$scope','$http',function ($rootScope,$scope,$http) {
    //使用$scope.$on监听$viewContentLoaded事件，可以再页面加载完成以后进行一些操作
    $scope.$on('$viewContentLoaded',function(){
        console.log('页面加载完成');
    })

    $scope.search=function(){
        personName=$scope.personName;
        $http.get('search',{params:{personName:personName}}).success(function(data){
            $scope.person=data;
        })
    }
}])

app.controller('View2Controller',['$rootScope','$scope','$http',function ($rootScope,$scope,$http) {
    //使用$scope.$on监听$viewContentLoaded事件，可以再页面加载完成以后进行一些操作
    $scope.$on('$viewContentLoaded',function(){
        console.log('页面加载完成');
    })

}])