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
  $facebookProvider.setPermissions("public_profile,email,user_birthday,user_posts,publish_actions");
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
	// Facebook login
	$scope.login = function(){
		console.log('login Button clicked');
		$facebook.login().then(function(){
			refresh();
		});
	};
	
	//Facebook Logout
	$scope.logout = function(){
		$facebook.logout().then(function(){
			console.log('Logged Out from Facebook');
			$scope.isUserLoggedIn = false;
		});
	};
	
	function refresh(){
		$facebook.api("/me?fields=first_name,last_name,locale,birthday").then(function(response){
			console.log(response);
			$scope.userName = response.first_name;
			$scope.isUserLoggedIn = true;
			$scope.userData = response;
			
			// Get user profile picture
			$facebook.api("/me/picture").then(function(response){
				console.log(response.data.url);
				$scope.profileImage=response.data.url;
				
				//GET user permissions
				$facebook.api("/me/permissions").then(function(response){
					$scope.permissions = response.data;
					
					//GET User posts
					$facebook.api("/me/posts").then(function(response){
						$scope.posts = response.data;
					},function(error){
					});
				},function(err){
				});
			},function(err){
			});
		},function(err){
			console.log(err);
		});
	}
	
	// publish posts
	$scope.publishPost = function(){
		$facebook.api("/me/feed","post",{message: $scope.messagebody}).then(function(response){
			console.log(response);
			refresh();
		},function(err){
			console.log(err);
		});
	};
	
	//
	
	refresh();
}]);