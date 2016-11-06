function new_task(){
	var value = document.getElementById("input").value;
	var parrafo = document.createElement("p");
	var contenido = document.createTextNode(value);
	parrafo.appendChild(contenido);
	parrafo.onclick=function (){
		if (this.parentNode.id === "task_undone"){
			document.getElementById("task_done").appendChild(this);
		}else{
			document.getElementById("task_undone").appendChild(this);
		}
	};
	document.getElementById("task_undone").appendChild(parrafo);
}

function add_to_list(name_list){
	var lista = document.getElementById(name_list);


}
