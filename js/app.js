$(function() {

// Global variables
var player = 'player1';
var $playerOneName;
var $playerTwoName;
var $inputBoxes = $('input');
var $playerTurn = $('#player-turn');
var $col = $('.col');
var $game = $('.game');
var $audioPlay = $('#play-sound')[0];
var $audioWin = $('#win-sound')[0];
var $playButton = $('#enter-players');
var $overlay = $('.overlay');


// CheckWins function
var checkWins = function() {

	var matrix = []; // creates empty matrix array

	// Creates arrays of all columns
	for (y=0; y < $col.length; y++) {
		var $divArray = $('.col')[y].children // create an array of divs for each col
		// console.log($colArrayOfDivs);
		var classNameArray = []; // create an array of class names
		for (x=0; x < $divArray.length; x++) {
			$divArray[x].className; // grabs class name of div's
			classNameArray.push($divArray[x].className) // pushes class names into class array
		}
		// console.log(classNameArray);
		matrix.push(classNameArray); // pushes class name array into matrix array
	}

	// Checks columns
	for (i=0; i < 7; i++) {
		// console.log(matrix[i]);
		for(j=0; j < 3; j++) {
			if (matrix[i][j] == 'minion1' && matrix[i][j+1] == 'minion1' && matrix[i][j+2] == 'minion1' && matrix[i][j+3] == 'minion1') {
				$audioWin.play();
				$playerTurn.text('Game over. ' + $playerOneName + ' won!');
				endGame();
				// $col.off('click'); // turns off listener; won't let user click any boxes <-- THIS BROKE MY CODE AND DROVE ME & THOM INSANE GAHHHHHHHHHHHHHH
			} else if (matrix[i][j] == 'minion2' && matrix[i][j+1] == 'minion2' && matrix[i][j+2] == 'minion2' && matrix[i][j+3] == 'minion2') {
				$audioWin.play();
				$playerTurn.text('Game over. ' + $playerTwoName + ' won!');
				endGame();
				// $col.off('click'); // turns off listener; stops game
			}
		} // end j for loop
	} // end i for loop

	// Checks rows
	for (i=0; i < 4; i++) {
		for (j=0; j < 6; j++) {
			if (matrix[i][j] == 'minion1' && matrix[i+1][j] == 'minion1' && matrix[i+2][j] == 'minion1' && matrix[i+3][j] == 'minion1') {
				$audioWin.play();
				$playerTurn.text('Game over. ' + $playerOneName + ' won!');
				endGame();
				// $col.off('click'); // turns off listener; won't let user click any boxes
			} else if (matrix[i][j] == 'minion2' && matrix[i+1][j] == 'minion2' && matrix[i+2][j] == 'minion2' && matrix[i+3][j] == 'minion2') {
				$audioWin.play();
				$playerTurn.text('Game over. ' + $playerTwoName + ' won!');
				endGame();
				// $col.off('click'); // turns off listener; won't let user click any boxes
			}
		} // end j for loop
	} // end i for loop

	// Checks diagonal - bottom-up
	for (i=0; i < 4; i++) {
		for (j=3; j < 6; j++) {
			if (matrix[i][j] == 'minion1' && matrix[i+1][j-1] == 'minion1' && matrix[i+2][j-2] == 'minion1' && matrix[i+3][j-3] == 'minion1') {
				$audioWin.play();
				$playerTurn.text('Game over. ' + $playerOneName + ' won!'); // alerts user that minion1 won
				endGame();
				// $col.off('click'); // turns off listener; won't let user click any boxes
			} else if (matrix[i][j] == 'minion2' && matrix[i+1][j-1] == 'minion2' && matrix[i+2][j-2] == 'minion2' && matrix[i+3][j-3] == 'minion2') {
				$audioWin.play();
				$playerTurn.text('Game over. ' + $playerTwoName + ' won!'); // alerts user that minion2 won
				endGame();
				// $col.off('click'); // turns off listener; won't let user click any boxes
			}
		} // end j for loop
	} // end i for loop

	// Checks diagonal - top-bottom
	for (i=0; i < 4; i++) {
		for (j=0; j < 3; j++) {
			if (matrix[i][j] == 'minion1' && matrix[i+1][j+1] == 'minion1' && matrix[i+2][j+2] == 'minion1' && matrix[i+3][j+3] == 'minion1') {
				$audioWin.play();
				$playerTurn.text('Game over. ' + $playerOneName + ' won!');
				endGame();
				// $col.off('click'); // turns off listener; won't let user click any boxes
			} else if (matrix[i][j] == 'minion2' && matrix[i+1][j+1] == 'minion2' && matrix[i+2][j+2] == 'minion2' && matrix[i+3][j+3] == 'minion2') {
				$audioWin.play();
				$playerTurn.text('Game over. ' + $playerTwoName + ' won!');
				endGame();
				// $col.off('click'); // turns off listener; won't let user click any boxes
			}
		} // end j for loop
	} // end i for loop

} // end checkWins function

// When user clicks on columns
$col.click(function() {

	if (player == 'player1') { // if player 1's turn
	// debugger;
		// $(this).siblings('.empty:last').removeClass('empty').css('background', 'minion1');
		$audioPlay.play();
		$(this).children('.empty:last').removeClass().addClass('minion1').css({"background-image":"url('imgs/superman.png')", "background-size":"100%"}); // removes class and adds minion1 bg to children of col
		$playerTurn.text($playerTwoName + "'s" + " turn") // change message to player 2's turn
		checkWins(); // invoke checkWins function
		player = 'player2'; // change to playerTwo
	} else if (player == 'player2') { // if player 2's turn
		// $(this).siblings('.empty:last').removeClass('empty').css('background', 'minion2');
		$audioPlay.play();
		$(this).children('.empty:last').removeClass().addClass('minion2').css({"background-image":"url('imgs/spiderman.png')", "background-size":"100%"}); // removes class and adds minion2 bg to children of col
		$playerTurn.text($playerOneName + "'s" + " turn") // changes message to player 1's turn
		checkWins(); // invoke checkWins function
		player = 'player1'; // change to playerOne
	}

}); // end of col click function

// welcome function
var welcome = function() {

	$game.hide(); // hides game
	$overlay.show();

	$inputBoxes.hover(function(){$(this).css("opacity","1")}, function(){$(this).css("opacity",".5")}); // makes input box opacity higher on hover
	$playButton.hover(function(){$(this).css("opacity","1")}, function(){$(this).css("opacity",".5")}); // makes play button opacity higher on hover

	$playButton.click(function() {
		playGame(); // invoke play function
	})

}

// play function
var playGame = function() {

	$overlay.hide(); // hides game
	$game.show(); // displays game

	$('.container').hover(function(){$(this).css("opacity",".8")}, function(){$(this).css("opacity",".5")}); // makes container opacity higher on hover

	$playerOneName = $('#player-one').val(); // grabs player 1's name
	$playerTwoName = $('#player-two').val(); // grabs player 2's name

	// player = 'player1'; // sets player to playerOne
	$playerTurn.text($playerOneName + " starts"); // message to let user know playerOne starts

}; // end of play function

// clearBoard function
var clearBoard = function() {

	// console.log(player);

	for (y=0; y < $col.length; y++) {
		for (x=0; x < 6; x++) {
				$($col[y].children[x]).removeAttr("style").removeClass().addClass('empty');
		}
	}

	playGame();

}

// gameOver function
var endGame = function() {

	var playAgain = prompt('Do you want to play again? Yes or no?'); // prompts user to play again
	var lowerCasedAnswer = playAgain.toLowerCase(); // makes input lowercase

	if (lowerCasedAnswer == 'yes') { // if user enters 'yes'
		clearBoard(); // invoke clearBoard function
	} else { // if user enters anything else
		alert('Okay, bye.'); // alerts 'Okay, bye.'
		$game.hide(); // hides board
	}

}

welcome(); // invoke welcome function

}); // end of document function

// =============
// ARCHIVED CODE
// =============

// Variables
	// var $rows = $('.board > div');
	// var $row1 = $('.r1');
	// var $firstColumn = $('.r5:first()');
	// var column1 = [];
	// console.log(column1.push($firstColumn));
	// var $colChildren = $('.col > div');
	// var $empty = $('.empty');
	// var playerOne;
	// var playerTwo;
	// var gameOver = false;
	// var colLength = 7;
	// var rowLength = 6;

// While gameOver is false
// while (gameOver == false) {
	// if (player == playerOne) {
	// 	$col.hover(function(){$(this).children('.empty:first').css('background', 'minion1')}, function(){$(this).children('.empty:first').css('background', 'white')})
	// 	$col.click(function() {
	// 		$audioPlay.play();
	// 		$(this).children('.empty:last').removeClass().addClass('minion1').css('background', 'minion1'); // removes class and adds minion1 bg to children of col
	// 		$playerTurn.text(playerTwo + "'s" + " turn") // change message to player 2's turn
	// 		checkWins(); // invoke checkWins function
	// 		player = playerTwo; // change to playerTwo
	// 	});
	// } else if (player == playerTwo) {
	// 	$col.hover(function(){$(this).children('.empty:first').css('background', 'minion2')}, function(){$(this).children('.empty:first').css('background', 'white')})
	// 	$col.click(function() {
	// 		$audioPlay.play();
	// 		$(this).children('.empty:last').removeClass().addClass('minion2').css('background', 'minion2'); // removes class and adds minion2 bg to children of col
	// 		$playerTurn.text(playerOne + "'s" + " turn") // changes message to player 1's turn
	// 		checkWins(); // invoke checkWins function
	// 		player = playerOne; // change to playerOne
	// 	});
	// }
// }

// // Creating colArray with nums 0-5
	// var $colArray = [];
	// for (y=0; y < 6; y++) {
	// 	$colArray.push(y);
	// }
	// // reverse nums in array
	// $colArray.reverse();
	// console.log($colArray); // [5, 4, 3, 2, 1, 0];

// Check columns
	// for (i=0; i < matrix.length; i++) {
	// 	for (j=0; j < 3; j++) {
	// 		if (matrix[i][j] == 'minion1' && matrix[i][j+1] == 'minion1' && matrix[i][j+2] == 'minion1' && matrix[i][j+3] == 'minion1') {
	// 			console.log('minion1 wins');
	// 		} else if (matrix[i][j] == 'minion2' && matrix[i][j+1] == 'minion2' && matrix[i][j+2] == 'minion2' && matrix[i][j+3] == 'minion2') {
	// 			console.log('minion2 wins');
	// 	}
	// }

// Creating col array
	// var colArray = []; // create empty colArray; will add class name of divs; i.e. "empty", "minion1", "minion2", etc.
	// for (y=0; y < $col.length; y++) { // col length = 7
	// 	console.log($col[y].children); // creates 7 arrays of col divs
	// 	for (x=0; x < $col[y].children.length; x++) {
	// 		$col[y].children[x].className;
	// 		col1Array.push($col[y][x].className)
	// 	}
	// 	console.log(colArray)
	// }

// Checking 1st column
	// 	var $col1 = $('.col')[0].children // an array of divs of the 1st col
	// 	var col1Array = [];
	// 	for (x=0; x < $col1.length; x++) {
	// 		$col1[x].className;
	// 		col1Array.push($col1[x].className)
	// 	}
	// 	console.log(col1Array);
	// }

// Overlay Window
	// var docHeight = $(document).height();
	// var $form = $("<form></form>");
	// var inputs = ('Enter Player Names: <br><br>' + 'Player 1: ' + '<input type="text" name="player-one" placeholder="Enter Name">' + ' Player 2: ' + '<input type="text" name="player-two" placeholder="Enter Name"><br><br>');
	// var playButton = '<button>Enter</button>';
	// $form.append(inputs + playButton);

	// $divOverlay = $('<div>')
	// $divOverlay.append($("#overlay"));

	// $("body").append("<div id='overlay'></div>");
	// $('body').append($form);

	// $("#overlay")
	//   .height(docHeight)
	//   .css({
	// 		 'color' : 'white',
	//      'opacity' : 0.4,
	//      'position': 'absolute',
	//      'top': 0,
	//      'left': 0,
	//      'background-color': 'minion2',
	//      'width': '100%',
	//      'z-index': 5000
	//   });

	// playButton.click(function() {
		// playGame();
	// })

	// $("#enter-players")
	// 	.css({
	// 		''
	// 	})

	// $("#overlay").append($form);

// =====
// 	1:1
// =====

// Get done by Sunday 1/31/16:
// [x] CSS : MVP for basic layout
// 	[x] Wireframe for responsiveness? Try to
//  	[x] Asking for prompt (overlay, mask, hide/show/toggle)
// [x] Commits, comments
// [x] check win for horizontal, vertical, diagnonal
