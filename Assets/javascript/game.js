
var wordArray = ["blondie","journey","winger"];
var correctCount = 0;
var arrayIndex = 0;
var letterGuessedCorrect = [];
var numberOfGuesses = 10;
var lettersGuessedIncorrect = [];

function initNextWord() {
	console.log("next word");
	arrayIndex++;
	numberOfGuesses = 10;
	letterGuessedCorrect = [];
	lettersGuessedIncorrect = [];
}

function startGameHM() {
	console.log("starting game");
	numberOfGuesses = 10;
	letterGuessedCorrect = [];
	lettersGuessedIncorrect = [];
	showLettersGuessed();
	displayGuessesLeft()
	displayHMWord();
}

function displayHMWord() {
	var hmWordSlots = document.getElementById("hm-word-chars");
	console.log(hmWordSlots);
	var currentWord = wordArray[arrayIndex];
	var currentWordLength = currentWord.length;
	var myDashes = "";
	for(var i = 0 ;i < currentWordLength; i++ ) {
		var currentLetter = currentWord[i];
		var guess = "&nbsp;";
		if (letterGuessedCorrect.indexOf(currentLetter) != -1) {
			guess = currentLetter;
		}
		myDashes = myDashes + "<span class='letter'>"+ guess + "</span>";
	}
	hmWordSlots.innerHTML = myDashes;
}

function trackNumberOfGuesses() {
    numberOfGuesses--;
	if(0 >= numberOfGuesses) {
		alert('You lost, game restarting!')
		startGameHM();

		return false;
	}
	return true;
}

function displayGuessesLeft() {
	var guessesLeftDiv = document.getElementById("count-guesses-left");
	guessesLeftDiv.innerHTML = numberOfGuesses;
}

function showLettersGuessed() {
	var a = document.getElementById("letters-incorrect");
	a.innerHTML = "[" + lettersGuessedIncorrect + "]";
}

function showWinCount() {
	var a = document.getElementById("win-count");
	a.innerHTML = arrayIndex + 1;
}

function displayImage(iPath) {
	var a = document.getElementById("image-div");
	a.innerHTML = "<image src='" + iPath + "' width='70%' height='70%'>";
}

function playSound(scPath) {
	var a = document.getElementById("my-audio");
	a.pause();
	a.innerHTML = "<source src='" + scPath + "' type='audio/mpeg'>"; 
	a.load();
	a.play();
}

function hangmanKeypress(e) {
	var ekey = e.key;
	console.log(ekey);

	if (arrayIndex == 0 && numberOfGuesses == 10){
		startGameHM();
	}
	// Determine if user pressed correct key again
	if(letterGuessedCorrect.indexOf(ekey) != -1) {
		return;
	}
	if(lettersGuessedIncorrect.indexOf(ekey) != -1){
		return;
	}
	// Determine if user used up all guesses
	if(!trackNumberOfGuesses()) {
		return;
	}

	var myCurrentHMWord = wordArray[arrayIndex];
	console.log("My current word is "+ myCurrentHMWord); 
	// "blondie".indexOf("a")
	var ekeyIndexOfCurrentWord = myCurrentHMWord.indexOf(ekey); 
	console.log(ekeyIndexOfCurrentWord);
	if(ekeyIndexOfCurrentWord != -1) { 
		letterGuessedCorrect.push(ekey);				
	}
	else {
		lettersGuessedIncorrect.push(ekey);
	}
	// Determine if the user guessed all the letters in the current word.
	// If so, we will move to the next word in the list and show an
	// image on the left and play some music.
	var allLettersGuessedCorrectly = true;
	for(var abc=0;abc<myCurrentHMWord.length;abc++) {
		var currentLetter = myCurrentHMWord[abc];
		var idxOfCurrLetter = letterGuessedCorrect.indexOf(currentLetter);
		if(idxOfCurrLetter == -1) {
			allLettersGuessedCorrectly = false;
		}
	}

	if(allLettersGuessedCorrectly) {
		correctCount++;
		//alert("You guessed word: " + myCurrentHMWord);
		// show nice image, play music
		showWinCount(); 
		var imagePath = "Assets/images/" + myCurrentHMWord + ".jpg";
		displayImage(imagePath); 
		var scPath = "Assets/Audio/" + myCurrentHMWord + ".mp3";
		playSound(scPath); 

		if (correctCount == 3) {
			alert("You got all the words!!");
			return;
		}
		displayGuessesLeft();
		displayHMWord();
		initNextWord();
		return;
	}
	displayGuessesLeft();
	showLettersGuessed();
	displayHMWord();
}

document.addEventListener("keydown", hangmanKeypress);
