

var myHMList = ["blondie","journey","winger"];
var myHangmanListPointer = 0;
var letterGuessedCorrect = [];
var numberOfGuesses = 10;
var numberOfGuessesUsed = 0;
var lettersGuessedIncorrect = [];


function initNextWord() {
	console.log("next word");
	myHangmanListPointer++;
	numberOfGuessesUsed = 0;
	letterGuessedCorrect = [];
	lettersGuessedIncorrect = [];
}

function startGameHM() {
	console.log("starting game");
	myHangmanListPointer = 0;
	numberOfGuessesUsed = 0;
	letterGuessedCorrect = [];
	lettersGuessedIncorrect = [];
	showLettersGuessed();
	displayHMWord();
}

function displayHMWord(){				
	var hmWordSlots = document.getElementById("hm-word-chars");
	console.log(hmWordSlots);
	console.log(document);
	var currentWord = myHMList[myHangmanListPointer];
	var currentWordLength = currentWord.length;
	var myDashes = "";
	for(var i = 0 ;i < currentWordLength; i++ ) {
		var currentLetter = currentWord[i];
		var guess = "&nbsp;";
		if (letterGuessedCorrect.indexOf(currentLetter) != -1) {
			guess = currentLetter;
		}

		myDashes = myDashes + "<span class='letter'>"+ guess + "</span>";	

		//<span class="letter">&nbsp;</span>				
	}
	hmWordSlots.innerHTML = myDashes;


}

function trackNumberOfGuesses() {
    numberOfGuessesUsed++;
	if(numberOfGuessesUsed >= numberOfGuesses) {
		//alert("You Lost");
		return false;
	}
	return true;
}

function displayGuessesLeft() {
	var guessesLeftDiv = document.getElementById("count-guesses-left");
	guessesLeftDiv.innerHTML = numberOfGuesses - numberOfGuessesUsed;
}

function showLettersGuessed() {
	var letterGuesseDiv = document.getElementById("letters-incorrect");
	letterGuesseDiv.innerHTML = "[" + lettersGuessedIncorrect + "]";
}

function showWinCount() {
	var letterGuesseDiv = document.getElementById("win-count");
	letterGuesseDiv.innerHTML = myHangmanListPointer + 1;
}


function hangmanKeypress(e) {
	var ekey = e.key;
	console.log(ekey);

	if (myHangmanListPointer == 0 && numberOfGuessesUsed == 0){
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


	
	var myCurrentHMWord = myHMList[myHangmanListPointer];
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
		//alert("You guessed word: " + myCurrentHMWord);
		// show nice image, play music
		showWinCount();
		var lenOfWordList = myHMList.length;
		if (myHangmanListPointer >= lenOfWordList) {
			//alert("You got all the words!!");
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

document.addEventListener("keydown", hangmanKeypress, false);






