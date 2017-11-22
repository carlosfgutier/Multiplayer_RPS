//GLOBAL VARIABLES
var P1status = false;
var P2status = false;

var P1name;
var P2name;
//-------------------

$(document).ready(function(){
	$("#inputP2").hide();
	$("#buttonP2").hide();

	$(".weapons").hide();

	$(".wins").hide();
	$(".losses").hide();
});

//P1 ENTERS FUNCTION
$("#buttonP1").on("click", function() {
	if ($("#inputP1").val().trim() != "") {
		P1status = true;
		
		//create name for p1
		P1name = $("#inputP1").val().trim();
		$(".P1").text(P1name);

		$("#inputP1").hide();
		$("#buttonP1").hide();

		$("#inputP2").show();
		$("#buttonP2").show();

		$("#welcomeMessage").text("Welcome " + P1name + "!");
		$("#waitMessage").text("Please wait for an opponent");		
	}
});

//P2 ENTERS
$("#buttonP2").on("click", function() {
	if ($("#inputP2").val().trim() != "") {
		P2status = true;
		
		//create name for p2
		P2name = $("#inputP2").val().trim();
		$(".P2").text(P2name);

		$("#inputP2").hide();
		$("#buttonP2").hide();

		$(".weapons").show();
		$(".wins").show();
		$(".losses").show();

		$("#welcomeMessage").text("Welcome " + P1name + " and " + P2name + "!");
		$("#waitMessage").text(P1name +", " + P2name + ", choose your weapons!");
	}
});


//CHAT
//-------------------//



