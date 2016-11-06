var app = angular.module('miapp',[]);



app.controller('miContoller',['$scope',function ($scope){
	$scope.cliente1 = {nombre: 'CL1', direccion: 'DIR1'};
	$scope.cliente2 = {nombre: 'CL2', direccion: 'DIR2'};

	$scope.sayHello = function (){
		return 'Hello desde padre';
	}
}]);


app.directive('miDirectiva',function (){
	return {
		restrict: 'AE',
		replace: 'true',
		
		template: '<p style="background-color:{{color}}">Hello world </p>',
		link: function (scope,elem,attrs){

			//Function click
			elem.bind('click',function (){
				elem.css('background-color','white');
				scope.$apply(function () {
					scope.color="white";
				});
			});

			//Function mouseover
			elem.bind('mouseover',function (){
				elem.css('cursor','pointer');
			});

		}
	};
});

/*
scope – The scope passed to the directive. In this case it’s the same as the parent controller scope.

elem – 	The jQLite (a subset of jQuery) wrapped element on which the directive is applied. If you have included jQuery in the HTML 
		before AngularJS is included, this becomes jQuery wrapped instead of jQLite. As the element is already wrapped with jQuery/jQLite,
		there is no need to again wrap it inside $() for DOM manipulations.

attrs – An object representing normalized attributes attached to the element on which the directive is applied. For example, you can attach 
		attributes in HTML like: <hello-world some-attribute></hello-world> and access it in the link function as attrs.someAttribute.



The link function is mainly used for attaching event listeners to DOM elements, watching model properties for changes, and updating the DOM. 
In the previous directive snippet, we attached two listeners, click and mouseover. The click handler resets the background color of the <p>, 
while the mouseover handler changes the cursor to pointer. The template has an expression {{color}} which changes whenever the model color changes 
in the parent scope, thereby changing the background color of Hello World
*/


app.directive('miDirectiva2',function (){
	return {
		scope: {
			color: '@col'
		},
		restrict: 'AE',
		replace: 'true',

		
		template: '<p style="background-color:{{color}}">Hello world </p>',
		link: function (scope,elem,attrs){

			//Function click
			elem.bind('click',function (){
				elem.css('background-color','white');
				scope.$apply(function () {
					scope.color="white";
				});
			});

			//Function mouseover
			elem.bind('mouseover',function (){
				elem.css('cursor','pointer');
			});

		}
	};
});

//Formas de  bindear el scope aislado con el del padre.

/*
1- Use @ for One Way text binding
	- Indicamosun scope aislado color que se liga al atribbuto colorAttr 
	  el cual es aplicado a la directiva en el HTML 



app.directive('helloWorld', function() {
  return {
    scope: {
      color: '@colorAttr'  //Si el nombre es el mismo se puede escribir solo con @
    },
    ....
    // the rest of the configurations
  };
});

<body ng-controller="MainCtrl">
  <input type="text" ng-model="color" placeholder="Enter a color"/>
  <hello-world color-attr="{{color}}"/>
</body>

Es llamado one way binding porque con esta técnica solo se puede pasar Strings 
al atributo usando {{}}.

Cuando el scope padre cmabia, también lo hace el scope aislado, pero no a la inversa.

*/

/*
2- Use = for two way binding

app.directive('helloWorld', function() {
  return {
    scope: {
      color: '='
    },
    ....
    // the rest of the configurations
  };
});

<body ng-controller="MainCtrl">
  <input type="text" ng-model="color" placeholder="Enter a color"/>
  <hello-world color="color"/>
</body>

Esta técnica permite asignar el modelo actualo del scope  al atributo  mediante cadena. Se 
le puede pasar string simple u objetos complejos al scope aislado.

Permite el two way binding si el padre cambia el hijo también y viceversa.

Puedesver las propiedades del scope para cambios.
*/


/*
3 - Use & para ejecutar functiones en el scope padre

A veces es necasario llamar a funciones definidas en el scope padre, desde una scope 
de directiva aisalada

app.directive('sayHello', function() {
  return {
    scope: {
      sayHelloIsolated: '&amp;' 
    },
    ....
    // the rest of the configurations
  };
});

<body ng-controller="MainCtrl">
  <input type="text" ng-model="color" placeholder="Enter a color"/>
  <say-hello sayHelloIsolated="sayHello()"/>
</body>

*/
app.directive('sayHello', function() {
  return {
    scope: {
      sayHello: '&sayHello' 
    },
    restrict: 'AE',
	replace: 'true'
   
    // the rest of the configurations
  };
});

/*

COMPILE / LINK / CONTROLLER

Al escribir directivas en AngularJS nos topamos con las funciones compile, link y controller. Veremos qué son cada una de ellas y cuando usarlas.
Función compile: Usado para la manipulación de tElements, o template elements, del DOM, por lo tanto manipulaciones que aplican a todos los clones asociados con la directiva. Si usas las funciones link, prelink o postlink, la función compile debe retornar una función link porque el atributo 'link' es ignorado si hay un atributo 'compile' definido.
Función link: Normalmente usado para registrar listeners en el DOM, como expresiones $watch en el scope), así como actualizar el DOM manipulando los iElement o individual element. Es ejecutado después de que la plantilla ha sido clonada, por ejemplo al usar ng-repeat. Digamos que estamos dentro de <li ng-repeat...>, la función link es ejecutada después que el tElement <li> ha sido clonado en un iElement. $watch permite a la directiva ser notificada de un cambio en una propiedad del scope (asociado a cada instancia), lo que permite a la directiva mostrar un valor de instancia actualizado al DOM.
Función controller: Debe ser usado cuando otra directiva necesita interactuar con esta directiva.
A tener en cuenta: La función compile no tiene acceso al scope, pero si la función link.

Reglas de Oro
Correr código antes de compilar: compile
Correr código después de compilar: link
 
Convenciones en Angular
Lógica del negocio: controller
Manipulación del DOM: link

Para directivas simples: Usar solo link


compile function - use for template DOM manipulation (i.e., manipulation of 
tElement = template element), hence manipulations that apply to all DOM clones of
 the template associated with the directive. (If you also need a link function
  (or pre and post link functions), and you defined a compile function, the compile 
  function must return the link function(s) because the 'link' attribute is ignored 
  if the 'compile' attribute is defined.)

link function - normally use for registering listener callbacks 
(i.e., $watch expressions on the scope) as well as updating the DOM
(i.e., manipulation of iElement = individual instance element). 
It is executed after the template has been cloned. E.g., inside an <li ng-repeat...>,
the link function is executed after the <li> template (tElement) has been cloned
(into an iElement) for that particular <li> element. A $watch allows a 
directive to be notified of scope property changes (a scope is associated
with each instance), which allows the directive to render an updated instance value 
to the DOM.

controller function - must be used when another directive needs to interact 
with this directive. E.g., on the AngularJS home page, the pane directive needs 
to add itself to the scope maintained by the tabs directive, hence the tabs directive 
needs to define a controller method (think API) that the pane directive can access/call. 

*