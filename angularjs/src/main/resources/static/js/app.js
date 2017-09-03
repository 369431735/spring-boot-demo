var app = angular.module('myApp', [ 'filters','ui.router', 'toastr' ]);

app.run(function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/oper');
	$stateProvider.state('/oper',{ // /oper 为路由名称
        url : '/oper',
        controller:'View1Controller',  //controller 路由控制器名称
        templateUrl: 'views/view1.html', //templateUrl定义的视图的真正地址
    }).state('/directive',{ // /oper 为路由名称
        url : '/directive',
        controller:'View2Controller',  //controller 路由控制器名称
        templateUrl: 'views/view2.html', //templateUrl定义的视图的真正地址
    });
});

