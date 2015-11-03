var app = angular.module('ngSocial',['ngRoute','ngFacebook'])

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

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('1498614777106084');
  $facebookProvider.setPermission("public_profile,email,user_birthday");
})

.run( function( $rootScope ) {
  // Load the facebook SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script'); 
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
})

.controller('FacebookCtrl',['$scope','$facebook',function($scope,$facebook){
	
	$scope.isUserLoggedIn = false;
	$scope.login = function(){
		$facebook.login().then(function(){
			refresh();
		});
	};
	
	function refresh(){
	
	}
}]);