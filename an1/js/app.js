var myapp = angular.module ('an1',['ngRoute']);

myapp.config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when("/",{
			templateUrl:'views/login.html',
			controller: 'loginController'
		}).
		when("/user",{
			templateUrl: 'views/userHome.html',
			
		}).
		otherwise({
			redirectTo: "/",
		});
}]);

myapp.controller ("loginController",["$scope","$location",function($scope,$location){

	$scope.msj ="";
	$scope.login = function (){
		if ($scope.user==="user1" && $scope.pass==="pass1"){
			$location.path("/user");
		}else{
			$scope.msj="Error de usuario/password"
		}
		console.log($scope.user);
		console.log($scope.pass);
	}
	
}]);

//CUstome directive to load menu
myapp.directive('ngmenu',function(){
	return{
		restrict: 'E', // PAra custom de html
		templateUrl: 'views/menu.html'
	}
})
