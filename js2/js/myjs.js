function count_links (){
	var enlaces = document.getElementsByTagName("a");
	console.log("Hay "+enlaces.length+" enlaces");
	console.log(enlaces[enlaces.length-2].href);

	var count = 0;
	for (var i = 0; i< enlaces.length; i++){
		if (enlaces[i].href==='http://prueba' || enlaces[i].href==='http://prueba/' ){
			count++;
		}
	}
	console.log(count + " enlaces apuntan a prueba");

	var parrafos = document.getElementsByTagName("p");
	var n_a_3parrafo = parrafos[2].getElementsByTagName("a");

	console.log(n_a_3parrafo.length);
}

count_links();