var app = angular.module('miapp',[]);



app.controller('miContoller',['$scope',function ($scope){
	$scope.cliente1 = {nombre: 'CL1', direccion: 'DIR1'};
	$scope.cliente2 = {nombre: 'CL2', direccion: 'DIR2'};
}]);


app.directive('miDirectiva',function (){
	return {
		restrict: 'AE',
		scope: {
			clienteDinamico: '=cliente'
		},
		replace: 'true',
		template: '<h3>{{clienteDinamico.nombre}} vive en {{clienteDinamico.direccion}}</h3>'
	};
});

/*
El scope dentro de la directiva crea una Scope aislada den controlador y le indicamos con que elemento va a trabajar (clienteDinamico) 
y con =cliente  es el atributo que usaremos dentro de la vista.


restrict – 	This provides a way to specify how a directive should be used in HTML (remember a directive can appear in four ways). 
			In this case we have set it to 'AE'. So, the directive can be used as a new HTML element or an attribute. 
			To allow this directive to be used as a class we can set restrict to 'AEC'.

template – 	This specifies the HTML markup that will be produced when the directive is compiled and linked by Angular. This does not have to be 
			a simple string. The template can be complex, often involving other directives, expressions ({{ }}), etc. In most cases you want 
			to use templateUrl instead of template. So, ideally you should place the template in a separate HTML file and make templateUrl point to it.
			
replace – 	This specifies if the generated template will replace the HTML element on which the directive is attached. In our case we have used 
			the directive as <hello-world></hello-world>, and replace is set to true. So, after the directive is compiled, the produced output template 
			replaces <hello-world></hello-world>. The final output is <h3>Hello World!!</h3>. If you set replace to false, the default, the output template 
			will be inserted into the element on which the directive is invoked.
*/
