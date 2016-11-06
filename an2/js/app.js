var app = angular.module('an2',['ngRoute']);

app.config(['$routeProvider',function ($routeProvider){

		$routeProvider
				.when ("/",{
					templateUrl: 'views/login.html',
					controller: 'loginController'
				})
				.when("/home",{
					templateUrl:'views/home',
					controller: 'homeController'
				})
				.otherwise ({
						redirectTo:"/"
				});

}]);

app.controller("loginController",["$scope","$location",function($scope,$location){
	

	$scope.checkuser = function (){
		if($scope.user === 'user1' && $scope.pass === 'pass1'){
			$location.path("/home");
		}
	}

	

}]);

app.controller("menuController",["$scope","$location",function($scope,$location){

	$scope.isActive = function (viewLocation){
		return viewLocation === $location.path();
	}
}]);
app.controller("homeController",["$scope","$location",function($scope,$location){

	
}]);
app.directive('ngmenu',function(){
	return {
		restrict: 'E',
		templateUrl: 'views/menu.html'
	}

});