var app = angular.module('miapp',[]);



app.controller('miContoller',['$scope',function ($scope){
	var cliente1 = {nombre: 'CL1', direccion: 'DIR1'};
	var cliente2 = {nombre: 'CL2', direccion: 'DIR2'};
	$scope.clients = [];
	$scope.clients.push(cliente1);
	$scope.clients.push(cliente2);
	$scope.test2 ="Parent"



	
}]);


app.directive('parentDirective',function (){
	return {
		restrict: 'E',
		template: '<div> {{clients[0].nombre}} vive en  </div>'
		
	};
});
app.directive('prueba2',['$http',function ($http){
	return {
		restrict: 'E',
		template: '<ul><li ng-repeat="user in users"><p>{{user.nombre}} {{user.profesion}} {{user.edad}}</p></li></ul>',
		link: function (scope,element,attr){
			element.css('border-color','red')
			$http.get('js/data.json').success ( function (data){
				scope.users = data; 
			});
		}
		
	};
}]);

