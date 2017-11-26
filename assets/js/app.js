//INITIALIZE FIREBASE
var config = {
	apiKey: "AIzaSyBqbNDdsmMHbnkX9b8BNvstLjhsLQCg2bo",
	authDomain: "rps-online-3568e.firebaseapp.com",
	databaseURL: "https://rps-online-3568e.firebaseio.com",
	projectId: "rps-online-3568e",
	storageBucket: "",
	messagingSenderId: "523143695031"
};

firebase.initializeApp(config);
var database = firebase.database();

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

var Player1;
var Player2;
//------------------------//

$(document).ready(function(){
	$("#inputP2").hide();
	$("#buttonP2").hide();

	$(".weapons1").hide();
	$(".weapons2").hide();

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

	updateScoreP1();
	//SEND SNAPSHOT
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

		$(".weapons1").show();
		$(".wins").show();
		$(".losses").show();

		$("#winsp1").text("Wins: " + P1wins);
		$("#lossesp1").text("Losses: " + P1losses);

		$("#winsp2").text("Wins: " + P2wins);
		$("#lossesp2").text("Losses: " + P2losses);

		$("#welcomeMessage").text("Welcome " + P1name + " and " + P2name + "!");
		$("#waitMessage").text(P1name + " you pick first");
	}

	updateScoreP2();
	//SEND SNAPSHOT
});

//PLAYERS CHOOSE WEAPON
//---------------------//
var contender1;
var contender2;

var contender1Weapon
var contender2Weapon

$("#blueSquare").on("click", ".weaponImage", function() {
	contender1 = $(this).attr("value");
	console.log(contender1);
	$("#P1contender").text(contender1);
	$("#waitMessage").text(P2name + ", it's your turn")
	$(".weapons2").show();
});

$("#redSquare").on("click", ".weaponImage", function() {
	contender2 = $(this).attr("value");
	console.log(contender2);

	if (contender1 == rock) {
		if (contender2 == rock) {
			$("#P2contender").text(contender2);
			$("#results").text("It's a tie");
			//SEND SNAPSHOT
			//WAIT & RESET FUNCTION
		}
		else if (contender2 == paper) {
			$("#P2contender").text(contender2);
			$("#results").text(P2name + " wins");
			P2wins++;
			$("#winsp2").text("Wins: " + P2wins);
			P1losses++;
			$("#lossesp1").text("Losses: " + P1losses);
			updateScoresAll();
			//SEND SNAPSHOT
			//WAIT & RESET FUNCTION
		}
		else if (contender2 == scissors) {
			$("#P2contender").text(contender2);
			$("#results").text(P1name + " wins");
			P1wins++;
			$("#winsp1").text("Wins: " + P1wins);
			P2losses++;
			$("#lossesp2").text("Losses: " + P2losses);
			updateScoresAll();
			//SEND SNAPSHOT
			//WAIT & RESET FUNCTION
		}
		else {}
	};
	if (contender1 == paper) {
		if (contender2 == paper) {
			$("#P2contender").text(contender2);
			$("#results").text("It's a tie");
		}
		else if (contender2 == scissors) {
			$("#P2contender").text(contender2);
			$("#results").text(P2name + " wins");
			P2wins++;
			$("#winsp2").text("Wins: " + P2wins);
			P1losses++;
			$("#lossesp1").text("Losses: " + P1losses);
			updateScoresAll();
			//SEND SNAPSHOT
			//WAIT & RESET FUNCTION
		}
		else if (contender2 == rock) {
			$("#P2contender").text(contender2);
			$("#results").text(P1name + " wins");
			P1wins++;
			$("#winsp1").text("Wins: " + P1wins);
			P2losses++;
			$("#lossesp2").text("Losses: " + P2losses);
			updateScoresAll();
			//SEND SNAPSHOT
			//WAIT & RESET FUNCTION
		}
		else {}
	};
	if (contender1 == scissors) {
		if (contender2 == scissors) {
			$("#P2contender").text(contender2);
			$("#results").text("It's a tie");
		}
		else if (contender2 == rock) {
			$("#P2contender").text(contender2);
			$("#results").text(P2name + " wins");
			P2wins++;
			$("#winsp2").text("Wins: " + P2wins);
			P1losses++;
			$("#lossesp1").text("Losses: " + P1losses);
			updateScoresAll();
			//SEND SNAPSHOT
			//WAIT & RESET FUNCTION
		}
		else if (contender2 == paper) {
			$("#P2contender").text(contender2);
			$("#results").text(P1name + " wins");
			P1wins++;
			$("#winsp1").text("Wins: " + P1wins);
			P2losses++;
			$("#lossesp2").text("Losses: " + P2losses);
			updateScoresAll();
			//SEND SNAPSHOT
			//WAIT & RESET FUNCTION
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

//FUNCTIONS 
//--------------------//	
function updateScoreP1() {
	Player1 = {
		Name: P1name,
		Wins: P1wins,
		Losses: P1losses,
	}

	database.ref().push(Player1);

};

function updateScoreP2() {
	Player2 = {
		Name: P2name,
		Wins: P2wins,
		Losses: P2losses,
	}

	database.ref().push(Player2);
};

function updateScoresAll() {
	updateScoreP1();
	updateScoreP2();
};

//CREATE FUNCTION FOR A TIMER THAT WILL WAIT TWO SECONS AFTER P2 MAKES CHOICE THEN
//RESET WAITMESSAGE TO P1 It's your turn
//RESET BATTLEBOARD TO
	//results = ""
	//P1contender = ""
	//P2contender = ""
	//hide P2weapons
	//SEND SNAPSHOT of reset screen
