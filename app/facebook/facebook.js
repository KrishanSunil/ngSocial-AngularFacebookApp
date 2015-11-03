var app = angular.module('ngSocial',['ngRoute'])

.config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when('/facebook',{
			templateUrl:'facebook/facebook.html',
			controller:'FacebookCtrl'
		})
		.
		otherwise({
			redirectTo:'/facebook'
		});
}])

.controller('FacebookCtrl',[function(){
	console.log('Inside FacebookCtrl');
}]);