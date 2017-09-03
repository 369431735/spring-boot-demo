/*document.write("<link rel='stylesheet' href='/bootstrap/css/bootstrap.min.css'>");
document.write("<link rel='stylesheet' href='/bootstrap/css/bootstrap-theme.min.css'>");
document.write("<link rel='stylesheet' href='/css/style.css'>");
document.write("<script src='/jquery/jquery.min.js'></script>");
document.write("<script src='/bootstrap/js/bootstrap.min.js'></script>");*/

/*document.write("<script src='/js/app.js'></script>");
document.write("<script src='/js/services.js'></script>");
document.write("<script src='/js/controllers.js'></script>");
document.write("<script src='/js/filters.js'></script>");
document.write("<script src='/js/directives.js'></script>");*/

var app = angular.module('myApp', []);
// 导航条控制器
app.controller('nav_info', function($scope, $http) {
	// 初始化导航条信息
	$http({
		url : "users/header"
	}).success(function(response) {
		if (response.status == "success") {
			if (response.msg == "sell") {
				$("#h_login").hide();
				$("#h_nickname").text(response.nickname);
				$("#h_balance").text(response.money);
			} else {
				$("#h_login").hide();
				$("#h_store").hide();
				$("#h_nickname").text(response.nickname);
				$("#h_balance").text(response.money);
			}
		} else {
			$("#h_nickname").hide();
			$("#h_balance").hide();
			$("#h_indent").hide();
			$("#h_store").hide();
			$("#h_switch").hide();
			$("#h_out").hide();
		}
	});
	// 安全退出
	$scope.out = function() {
		$http({
			url : "users/out"
		}).success(function(response) {
			if (response) {
				alert("安全退出成功！跳转首页中...");
				window.location.href = "index.html";
			}
		});
	}
});
// 登录控制器
app.controller('formSubmit', function($scope, $http) {
	$scope.submits = function() {
		var data = {
			user_name : $scope.user_name,
			password : $scope.password
		};
		$http({
			url : "users/login",
			params : data
		}).success(function(response) {
			if (response.status == "success") {
				alert(response.msg);
				window.location.href = "index.html";
			} else {
				$scope.ansInfo = response.msg;
			}
		});
	};
});
// 首页控制器
app.controller('init_home', function($scope, $http) {
	// 初始化首页商品数据
	$http.get("items/home_item").success(function(response) {
		$scope.items = response;
	});
	// 购买
	$scope.buy_item = function(item_id) {
		var data = {
			item_id : item_id
		};
		$http({
			url : "orders/add_order",
			params : data
		}).success(function(response) {
			if (response.status == "not_login") {
				$("#no_login").modal();
			} else if (response.status == "success") {
				alert(response.msg);
				window.location.href = "myorder.html";
			} else {
				alert(response.msg);
			}
		});
	};
});
// 我的订单页面控制器
app.controller('init_order', function($scope, $http) {
	// 初始化我的订单页面数据
	$http.get("orders/my_order").success(function(response) {
		$scope.orders = response;
	});
	// 支付订单
	$scope.pay_order = function(order_id) {
		var data = {
			order_id : order_id
		};
		$http({
			url : "orders/pay_order",
			params : data
		}).success(function(response) {
			if (response.status == "failure") {
				$("#no_money").modal();
			} else if (response.status == "success") {
				alert(response.msg);
				window.location.href = "myorder.html";
			}
		});
	};
	// 取消订单
	$scope.cancel_order = function(order_id) {
		var data = {
			order_id : order_id
		};
		$http({
			url : "orders/cancel_order",
			params : data
		}).success(function(response) {
			if (response.status == "success") {
				alert(response.msg);
				window.location.href = "myorder.html";
			} else {
				alert(response.msg);
			}
		});
	};
	// 删除订单
	$scope.del_order = function(order_id) {
		var data = {
			order_id : order_id
		};
		$http({
			url : "orders/del_order",
			params : data
		}).success(function(response) {
			if (response.status == "success") {
				alert(response.msg);
				window.location.href = "myorder.html";
			} else {
				alert(response.msg);
			}
		});
	};
	// 确认收货
	$scope.affirm_goods = function(order_id) {
		var data = {
			order_id : order_id
		};
		$http({
			url : "orders/affirm_goods",
			params : data
		}).success(function(response) {
			if (response.status == "success") {
				alert(response.msg);
				window.location.href = "myorder.html";
			} else {
				alert(response.msg);
			}
		});
	};
});
// 我的店铺控制器
app.controller('init_store', function($scope, $http) {
	// 初始化我的店铺页面数据
	$http.get("stores/my_store").success(function(response) {
		$scope.store_name = response[0].store_name;
		$scope.store_id = response[0].store_id;
		$scope.money = response[0].money;
		$scope.road_money = response[0].road_money;
	});
	// 获取我的商品信息
	$http.get("items/my_item").success(function(response) {
		$scope.items = response;
	});
	// 获取我的出售订单信息
	$http.get("orders/sell_orders").success(function(response) {
		$scope.orders = response;
	});
	// 商品列表与订单列表切换
	$scope.myItems = false;
	$scope.myOrders = true;
	$scope.toggle1 = function() {
		$scope.myItems = false;
		$scope.myOrders = true;
	};
	$scope.toggle2 = function() {
		$scope.myOrders = false;
		$scope.myItems = true;
	};
	// 发货
	$scope.send_goods = function(order_id) {
		var data = {
			order_id : order_id
		};
		$http({
			url : "orders/send_goods",
			params : data
		}).success(function(response) {
			if (response.status == "success") {
				alert(response.msg);
				send_goods();
			} else if (response.status == "success") {
				alert(response.msg);
			}
		});
	};
	// 编辑框（新增与修改）
	$scope.edit = true;
	$scope.error = false;
	$scope.edit_item = function(id) {
		if (id == 'new') {
			$("#edit").modal();
			$scope.edit = true;
			$scope.item_name = '';
			$scope.item_price = '';
		} else {
			$("#edit").modal();
			$scope.edit = false;
			$scope.item_id = $scope.items[id].item_id;
			$scope.item_name = $scope.items[id].item_name;
			$scope.item_price = $scope.items[id].item_price;
		}
	};
	// 提交表单(添加、修改)
	$scope.submits = function(action) {
		if (action != "edit") {
			$scope.item_id = action;
			action = null;
		}
		var data = {
			act : action,
			item_id : $scope.item_id,
			item_name : $scope.item_name,
			item_price : $scope.item_price
		};
		$http({
			url : "items/edit_goods",
			params : data
		}).success(function(response) {
			if (response.status == "success") {
				alert(response.msg);
				window.location.href = "mystore.html";
			} else {
				alert(response.msg);
			}
		});
	};
	// 删除商品
	$scope.del_item = function(item_id) {
		var data = {
			item_id : item_id
		};
		$http({
			url : "orders/del_item",
			params : data
		}).success(function(response) {
			if (response.status == "success") {
				alert(response.msg);
				send_goods();
			} else if (response.status == "success") {
				alert(response.msg);
			}
		});
	};
});
