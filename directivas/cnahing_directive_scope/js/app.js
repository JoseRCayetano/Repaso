
var app = angular.module('miapp',[]);

app.controller('miContoller',['$scope',function ($scope){
	$scope.cliente1 = {nombre: 'CL1', direccion: 'DIR1'};
	$scope.cliente2 = {nombre: 'CL2', direccion: 'DIR2'};
}]);

/*
By default a directive gets the parent’s scope. But we don’t want that in all cases. If we are exposing the parent controller’s 
scope to the directives, they are free to modify the scope properties. In some cases your directive may want to add several properties 
and functions to the scope that are for internal use only. If we are doing these things to parent’s scope, we are polluting it. 
So, we have two other options:
*/



/* 1- A child scope: This scope prototypically inherits the parent’s scope */

app.directive('miDirectiva',function (){
	return {
		scope: true, // use a child scope that inherit from parent
		restrict: 'AE',
		replace: 'true',
		template: '<h3>Hello world</h3>'
	};
});

/* 2 A isolated scope: A new scope that does not inherit from the parent and exists on its own. */

app.directive('miDirectiva',function (){
	return {
		scope: {}, // use a new isolated scope
		restrict: 'AE',
		replace: 'true',
		template: '<h3>Hello world</h3>'
	};
});

/*

This directive uses a new isolated scope that does not inherit from the parent. Isolated scopes are good when we want to create reusable components. 
By isolating the scope we guarantee that the directive is self contained and can be easily plugged into an HTML app. This provides the parent scope 
from becoming polluted, as it is not accessible inside the directive. In our modified helloWorld directive if you set scope to {} the code 
won’t work anymore. It will create an isolated scope for the directive and the expression {{color}} will now refer to that isolated scope 
property (not parent scope) which is undefined.

Isolating the scope does not mean that you have no access to the parent scope’s properties. There are techniques that allow you to access 
the parent scope’s properties and also watch for changes on them. We will discuss these techniques, and some more advanced concepts like 
Controller functions in part two of this series. Part two will also walk you through the creation of a fully fledged note taking app using 
Angular directives, so stay tuned!

*/