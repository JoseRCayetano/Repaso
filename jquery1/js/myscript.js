var phrases = ["Frase 1","Frase 2", "Frase 3"];

$('button').click(function (){
	select_phrase();
});


$('input').keyup(function(){
	$('#magic').text($(this).val());

})


function select_phrase (){
	var n_phrase=Math.floor(Math.random() * ((phrases.length) - 0)) + 0;
	$("#phrases").text(phrases[n_phrase]);
}