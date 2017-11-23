//GLOBAL VARIABLES
var P1status = false;
var P2status = false;

var P1name;
var P2name;

var P1wins = 0;
var P1losses = 0;

var P2wins = 0;
var P2losses = 0;

var rock = $("#rock1").attr("value");
var paper = $("#paper1").attr("value");
var scissors = $("#scissors1").attr("value");
//------------------------//

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

		$("#winsp1").text("Wins: " + P1wins);
		$("#lossesp1").text("Losses: " + P1losses);

		$("#winsp2").text("Wins: " + P2wins);
		$("#lossesp2").text("Losses: " + P2losses);

		$("#welcomeMessage").text("Welcome " + P1name + " and " + P2name + "!");
		$("#waitMessage").text(P1name + " you pick first");
	}
});

//PLAYERS CHOSE WEAPON
//---------------------//
var contender1;
var contender2;

var contender1Weapon
var contender2Weapon

$("#blueSquare").on("click", ".weaponImage", function() {
	contender1 = $(this).attr("value");
	// contender1Weapon = $(this).attr("src");
	console.log(contender1);
});

$("#redSquare").on("click", ".weaponImage", function() {
	contender2 = $(this).attr("value");
	// contender2Weapon = $(this).attr("src");
	console.log(contender2);

	if (contender1 == rock) {
		if (contender2 == rock) {alert("tie");}
		else if (contender2 == paper) {
			alert(P2name + " wins");
			P2wins++;
			$("#winsp2").text("Wins: " + P2wins);
			P1losses++;
			$("#lossesp1").text("Losses: " + P1losses);
			// $("#results").text(P2name + " wins");
			// $("#contenders").text('<img src="' + contender1Weapon + '">' + '<img src="' + contender2Weapon + '">');
		}
		else if (contender2 == scissors) {
			alert(P1name + " wins");
			P1wins++;
			$("#winsp1").text("Wins: " + P1wins);
			P2losses++;
			$("#lossesp2").text("Losses: " + P2losses);
		}
		else {}
	};
	if (contender1 == paper) {
		if (contender2 == paper) {alert("tie");}
		else if (contender2 == scissors) {
			alert(P2name + " wins");
			P2wins++;
			$("#winsp2").text("Wins: " + P2wins);
			P1losses++;
			$("#lossesp1").text("Losses: " + P1losses);
		}
		else if (contender2 == rock) {
			alert(P1name + " wins");
			P1wins++;
			$("#winsp1").text("Wins: " + P1wins);
			P2losses++;
			$("#lossesp2").text("Losses: " + P2losses);
		}
		else {}
	};
	if (contender1 == scissors) {
		if (contender2 == scissors) {alert("tie");}
		else if (contender2 == rock) {
			alert(P2name + " wins");
			P2wins++;
			$("#winsp2").text("Wins: " + P2wins);
			P1losses++;
			$("#lossesp1").text("Losses: " + P1losses);
		}
		else if (contender2 == paper) {
			alert(P1name + " wins");
			P1wins++;
			$("#winsp1").text("Wins: " + P1wins);
			P2losses++;
			$("#lossesp2").text("Losses: " + P2losses);
		}
		else {}
	};
});


//CHAT
//-------------------//
var message;

$("#send").on("click", function() {
	message = $("#inputChat").val().trim();
	$("#chatwindow").append("<p class='chatText'>" + message + "</p>");
	$("#inputChat").val("");
	$("#chatwindow").animate({
		scrollTop: $('#chatwindow .chatText:last-child').position().top
	}, 'slow');
});



