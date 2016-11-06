var app = angular.module ('app',['constante-directives']);



/* ------------------ Constante -------------------------------------- */

app.constant("miconstante","valor de la constante");
app.constant("const2",{name: ' const', lastname: 'tante'});
app.controller('constantController',['miconstante','const2',function(miconstante,const2){
	this.constante = miconstante;
	this.const2 = const2;
}]);

/* --------------------- VALUE ----------------------------------------- */
app.value('mivalue','valor de valor');
app.controller('valueController',['mivalue',function(mivalue){
	this.value = mivalue;
}]);

/* ---------------------- Servicio -----------------------------------------*/

function Miclase(){
	this.atr1 = 1;
	this.atr2 = 2;

	this.setAtr1 = function (atr1) {
		this.atr1 = atr1;
	}
	this.setAtr2 = function (atr2){
		this.atr2 = atr2;
	}
	this.getSuma = function (){
		return this.atr1 + this.atr2;
	}
}
app.service('miservicio',Miclase);

app.controller('servicioController',['miservicio',function(miservicio){
	this.servicio = miservicio;
	this.suma = miservicio.getSuma();
}]);

/* Inyectando en el constructor */
app.value("atributos",{
	atr1:3,
	atr2:4
});
function Miclase2(atributos){
	this.atr1 = atributos.atr1;
	this.atr2 = atributos.atr2;

	this.setAtr1 = function (atr1) {
		this.atr1 = atr1;
	}
	this.setAtr2 = function (atr2){
		this.atr2 = atr2;
	}
	this.getSuma = function (){
		return this.atr1 + this.atr2;
	}
}
app.service('miservicio2',['atributos',Miclase2]);

app.controller('servicio2Controller',['miservicio2',function(miservicio2){
	this.servicio2 = miservicio2;
	this.suma = miservicio2.getSuma();
}]);

/* ------------------ FACTORY ------------------------------ */
app.factory('mifactory1', function(){
	return "es-es"
});
app.factory('mifactory2', function(){
	return {
		suma: function (a,b){
			return a + b;
		},
		resta: function(a,b){
			return a - b;
		}
	}
});
app.factory("radio", function(){
	return 10;
});
app.factory("area",function(){
	return function(radio){
		return 3.1416 * radio * radio;
	}
});
app.controller('factoryController',['radio','area',function(radio,area){
	this.factory = area(radio);

}]);

/* inyectar dependencias */
app.value("tamanyoInicialRectangulo",{
  ancho:2,
  alto:3
});
 
function Rectangulo(tamanyoInicial) {
  this.ancho=tamanyoInicial.ancho;
  this.alto=tamanyoInicial.alto;
   
  this.setAncho=function(ancho) {
    this.ancho=ancho;
  }
   
  this.setAlto=function(alto) {
    this.alto=alto;
  }  
   
  this.getArea=function() {
    return this.ancho * this.alto;
  }
}
app.factory('rectangulo',['tamanyoInicialRectangulo',function(tamanyoInicialRectangulo){
	var rectangulo = new Rectangulo(tamanyoInicialRectangulo);
	return rectangulo;
}])

app.controller('factory2Controller',['rectangulo',function(rectangulo){
	this.factory = rectangulo;

}]);

/* -----------------------  PROVIDER ---------------------------------------- 
- Como el factory pero permite ser configurado antes de crearse el servicio.
- COmpuesto por 2 partes:

	Clase javascript de la cual sólo se instanica 1 objeto, lo que permite llamar en un bloque config antes de 
	que se llame al factory-provider y así configurarlo.

	Factory-provider, el cual crea el valor del servicio ( practicamente como un factory)


*/

function HasProvider(){
	//Variable privada
	var _algoritmo="";

	//Método público para establecer el algoritmo
	this.setAlgoritmo = function (algoritmo){
		_algoritmo=algoritmo;
	}

	// Factory que creará el valor del servicio.
	this.$get=function(){
		var hashFunction;
   
	    if (_algoritmo==="MD5") {
	      hashFunction=CryptoJS.MD5;
	    } else  if (_algoritmo==="SHA-1") {
	      hashFunction=CryptoJS.SHA1;
	    } else  if (_algoritmo==="SHA-2-256") {
	      hashFunction=CryptoJS.SHA256;
	    } else  if (_algoritmo==="SHA-2-512") {
	      hashFunction=CryptoJS.SHA512;
	    } else {
	      throw Error("El tipo de algoritmo no es válido:"+_algoritmo);
	    }
	   
	    var hash=function(message) {
	      var objHashResult=hashFunction(message);
	       
	      var strHashResult=objHashResult.toString(CryptoJS.enc.Base64);
	     
	      return strHashResult;
	    }
   
    return hash; //Nombre del servicio al que luego se le llama Provider
	}
}

//Creación del provider
app.provider("hash",HashProvider);

//Configurando el provider --> Se inyecta el PROVIDER no el FACTORY-PROVIDER
// Angular los obliga a llamar al provider hashProvider, al nombre del servicio se le añade Provider
app.config(['hashProvider',function(hashProvider){
	hashProvider.setAlgoritmo("SHA-1");
}])

// ya se encuentra disponible apra ser utilziado en otros sitios