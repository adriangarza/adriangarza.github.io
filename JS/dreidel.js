//init game logic variables
var numPlayers = 0;
var numAi = 0;
var player1 = {};
var player2 = {};
var com1 = {};
var com2 = {};
var com3 = {};
var currentScreen = "splashscreen";

function goToScreen(screenId) {
	document.getElementById("splashscreen").style.opacity = "0";
	document.getElementById("customize").style.opacity = "0";
	document.getElementById("game").style.opacity = "0";
	document.getElementById("options").style.opacity = "0";
	document.getElementById("about").style.opacity = "0";
	document.getElementById(screenId).style.opacity = "0";
	currentScreen = screenId;
}

function beginGame1p() {
	numPlayers = 1;
	gotoScreen("customize");
}

function beginGame2p() {
	numPlayers = 2;
	gotoScreen("customize")
}

//loads game screens based on numPlayers
function displayCustomize() {
	if (numPlayers === 2) {
		//react accordingly to second player choices
		//(will do this later)
	}
}

