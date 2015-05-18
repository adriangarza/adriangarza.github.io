//init audio files
var music = new Audio("sound/1-1.mp3");
var probelaunch = new Audio("sound/probelaunch.mp3");

//MUSIC
if (localStorage.musicPlaying === "playing") {
	music.play();
} else if (localStorage.musicPlaying === "paused") {
	music.pause();
} else {
	localStorage.musicPlaying = "playing";
	music.play();
}

//loops at end, Brian Eno forever
music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

//music controls
$("#play").click(function () {
    music.play();
    localStorage.musicPlaying = "playing";
});

$("#pause").click(function () {
    music.pause();
    localStorage.musicPlaying = "paused";
});

//this should only happen once
$("#probe").click(function() {
	//probelaunch.play();
	getParams();
	probelaunch.currentTime = 0;
	cycle(cycles);
	updateLocalStorage();
});

//test params
cycles = 40;

$("#defaults").click(function() {
	document.getElementById("algaeNumber").innerHTML = 3;
	document.getElementById("algaeSpawnRate").innerHTML = 3;
	document.getElementById("algaeSpawnChance").innerHTML = 0.06;
	document.getElementById("algaeLifeTime").innerHTML = 20;
	document.getElementById("cycles").innerHTML = 40;
	resetAlgaeParams();
	updateLocalStorage();
})

function cycle(cycles) {
	createAlgae();
	for(var i=0; i< cycles; i++) {
		updateAlgae();
		algaeLife();
	}
	updateAlgae();
}

function getParams() {
	getAlgaeParams();
}

function updateAlgae() {
	document.getElementById("algaePop").innerHTML = algaeArray.length;
}

function updateLocalStorage() {
	localStorage.algaeNumber = algaeNumber;
	localStorage.algaeSpawnRate = algaeSpawnRate;
	localStorage.algaeSpawnChance = algaeSpawnChance;
	localStorage.algaeLifeTime = algaeLifeTime;
	localStorage.cycles = cycles;
}

function getLocalStorage() {
	if(localStorage.algaeNumber) {
		algaeNumber = localStorage.algaeNumber;
		algaeSpawnRate = localStorage.algaeSpawnRate;
		algaeSpawnChance = localStorage.algaeSpawnChance;
		algaeLifeTime = localStorage.algaeLifeTime;
		cycles = localStorage.cycles;
	}
}