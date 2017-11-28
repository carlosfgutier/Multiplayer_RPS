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

//CHECK FOR CONNECTION
var connectedRef1;
var connectedRef2;

var connectionRef1 = database.ref("/connection1");
var connectionRef2 = database.ref("/connection2");

//FIREBASE
var playerInfo1 = database.ref("/connection1/playerInfo1");
var playerInfo2 = database.ref("connection2/playerInfo2");

var connectedRef = database.ref(".info/connected");
var con;

//OTHER VARIABLES
var P1name;
var P2name;

var P1wins = 0;
var P1losses = 0;

var P2wins = 0;
var P2losses = 0;

var rock = $("#rock1").attr("value");
var paper = $("#paper1").attr("value");
var scissors = $("#scissors1").attr("value");

var Player1 = {
		Name: P1name,
		Wins: P1wins,
		Losses: P1losses,
	}

var Player2 = {
	Name: P2name,
	Wins: P2wins,
	Losses: P2losses,
}

var timeoutVar = function(){
	setTimeout(reset, 2000);
}
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
		
		//create name for p1
		P1name = $("#inputP1").val().trim();

		$("#inputP1").hide();
		$("#buttonP1").hide();

		$("#inputP2").show();
		$("#buttonP2").show();

		$("#welcomeMessage").text("Welcome " + P1name + "!");
		$("#waitMessage").text("Please wait for an opponent");		
	}

	connectedRef.on("value", function(snap) {

		if (snap.val()) {
			con = connectionRef1.push(true);
			con.onDisconnect().remove();
			playerInfo1.onDisconnect().remove();
			//update score, player name and push to firebase
			updateScoreP1();
		}
	});

	// GRAB P1 NAME FROM DATABASE AND ADD TO HTML
	playerInfo1.on("value", function(snap) {
		console.log(snap.val().Name)
		playerName1 = (snap.val().Name);
		$(".P1").text(playerName1);
	});
});

//P2 ENTERS
$("#buttonP2").on("click", function() {
	if ($("#inputP2").val().trim() != "") {
		
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

	connectedRef.on("value", function(snap) {

		if (snap.val()) {
			con = connectionRef2.push(true);
			con.onDisconnect().remove();
			playerInfo2.onDisconnect().remove();
			updateScoreP2();
		}
	});

	//GRAB P2 NAME FROM DATABASE AND ADD TO HTML
	var playerName2 = database.ref("/connection2/playerInfo2")
	
	playerName2.on("value", function(snap) {
		console.log(snap.val().Name);
		$(".P2").text(snap.val().Name);
	});
});

//ROCK, PAPER, SCISSORS
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
			$("#waitMessage").text("It's a tie");
			//SEND SNAPSHOT OF SCORE
			timeoutVar();
		}
		else if (contender2 == paper) {
			$("#P2contender").text(contender2);
			$("#results").text(P2name + " wins");
			$("#waitMessage").text(P2name + " wins");
			P2wins++;
			$("#winsp2").text("Wins: " + P2wins);
			P1losses++;
			$("#lossesp1").text("Losses: " + P1losses);
			updateScoresAll();
			//SEND SNAPSHOT
			timeoutVar();
		}
		else if (contender2 == scissors) {
			$("#P2contender").text(contender2);
			$("#results").text(P1name + " wins");
			$("#waitMessage").text(P1name + " wins");
			P1wins++;
			$("#winsp1").text("Wins: " + P1wins);
			P2losses++;
			$("#lossesp2").text("Losses: " + P2losses);
			updateScoresAll();
			//SEND SNAPSHOT
			timeoutVar();
		}
		else {}
	};
	if (contender1 == paper) {
		if (contender2 == paper) {
			$("#P2contender").text(contender2);
			$("#results").text("It's a tie");
			$("#waitMessage").text("It's a tie");
			//SEND SNAPSHOT
			timeoutVar();
		}
		else if (contender2 == scissors) {
			$("#P2contender").text(contender2);
			$("#results").text(P2name + " wins");
			$("#waitMessage").text(P2name + " wins");
			P2wins++;
			$("#winsp2").text("Wins: " + P2wins);
			P1losses++;
			$("#lossesp1").text("Losses: " + P1losses);
			updateScoresAll();
			//SEND SNAPSHOT
			timeoutVar();
		}
		else if (contender2 == rock) {
			$("#P2contender").text(contender2);
			$("#results").text(P1name + " wins");
			$("#waitMessage").text(P1name + " wins");
			P1wins++;
			$("#winsp1").text("Wins: " + P1wins);
			P2losses++;
			$("#lossesp2").text("Losses: " + P2losses);
			updateScoresAll();
			//SEND SNAPSHOT
			timeoutVar();
		}
		else {}
	};
	if (contender1 == scissors) {
		if (contender2 == scissors) {
			$("#P2contender").text(contender2);
			$("#results").text("It's a tie");
			$("#waitMessage").text("It's a tie");
			//SEND SNAPSHOT
			timeoutVar();
		}
		else if (contender2 == rock) {
			$("#P2contender").text(contender2);
			$("#results").text(P2name + " wins");
			$("#waitMessage").text(P2name + " wins");
			P2wins++;
			$("#winsp2").text("Wins: " + P2wins);
			P1losses++;
			$("#lossesp1").text("Losses: " + P1losses);
			updateScoresAll();
			//SEND SNAPSHOT
			timeoutVar();
		}
		else if (contender2 == paper) {
			$("#P2contender").text(contender2);
			$("#results").text(P1name + " wins");
			$("#waitMessage").text(P1name + " wins");
			P1wins++;
			$("#winsp1").text("Wins: " + P1wins);
			P2losses++;
			$("#lossesp2").text("Losses: " + P2losses);
			updateScoresAll();
			//SEND SNAPSHOT
			timeoutVar();
		}
		else {}
	};
});

//CHAT
//-------------------//
//Want to make it to where chat messages have a different color background
//depending on who sent the message
$("#send").on("click", function(event) {
	event.preventDefault();

	var message = $("#inputChat").val().trim();
	var newMessage = {
		content: message,
	};

	database.ref().push(newMessage);
});

database.ref().on("child_added", function(childSnapshot, PrevChildKey) {

//make first two messages that appear welcome player one and player two as they enter

	var newMessage = childSnapshot.val().content;

	$("#chatwindow").append("<p class='chatText'>" + newMessage + "</p>");
	$("#chatwindow").animate({
		scrollTop: $('#chatwindow .chatText:last-child').position().top
	}, 'slow');
})

//FUNCTIONS 
//--------------------//	
function updateScoreP1() {
	Player1 = {
		Name: P1name,
		Wins: P1wins,
		Losses: P1losses,
	}

	playerInfo1.set(Player1);
};

function updateScoreP2() {
	Player2 = {
		Name: P2name,
		Wins: P2wins,
		Losses: P2losses,
	}

	playerInfo2.set(Player2);
};

function updateScoresAll() {
	updateScoreP1();
	updateScoreP2();
};

function reset() {
	$("#waitMessage").text(P1name + ", it's your turn!")
	$("#results").text("");
	$("#P1contender").text("");
	$("#P2contender").text("");
	$("#P2weapons").hide("");
};


