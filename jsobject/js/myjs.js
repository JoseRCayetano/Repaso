var Viking = function (name,hp, attack){
	this.name = name;
	this.hp = hp,
	this.attack=attack
}
Viking.prototype.damage = function(viking){
	viking.hp = viking.hp-this.attack;
}

var viking1 = new Viking("v1",100,8);
var  viking2 = new Viking("v2",100,7);

while (viking1.hp >= 0 || viking2.hp >= 0){

	viking1.damage(viking2);
	document.getElementById("battle").innerHTML = "<p>v1 pega a v2 y V2 se queda con "+viking2.hp+" de salud</p>";
	console.log("v1 pega a v2 y V2 se queda con "+viking2.hp+" de salud")
	viking2.damage(viking1);
    document.getElementById("battle").innerHTML="<p>v2 pega a v1 y V1 se queda con "+viking1.hp+" de salud</p>";
    console.log("v2 pega a v1 y V1 se queda con "+viking1.hp+" de salud")
}

function random (max, min) {
	return Math.floor(Math.random() * (max - min)) + min;
}
