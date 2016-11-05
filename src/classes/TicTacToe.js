import {Board} from "./Board.js";
import {Scanner} from "./Scanner.js";
import {Point} from "./Point.js";

export class TicTacToe {

	constructor() {
	}


	main() {
		
		let b = new Board();
		
		b.displayBoard();

		console.log("Who's gonna move first? (1)Computer (2)User: ");

		let scan = new Scanner();
		let choice = scan.doPromptOneNum();

		if (choice == b.COMPUTER) {
			let p = new Point(Random.nextInt(3), Random.nextInt(3));
			b.placeAMove(p, b.COMPUTER);
			b.displayBoard();
		}

		while (!b.isGameOver()) {

			console.log("Your move: ");
			let userMove = scan.doPrompt();

			b.placeAMove(userMove, b.HUMAN);
			b.displayBoard();

			if (b.isGameOver()) {
				break;
			}

			
			b.callMinimax(0, b.COMPUTER);
			for (let pasIndex=0; 
				pasIndex < b.rootsChildrenScores.length; pasIndex++) {

				let pas = b.rootsChildrenScores[pasIndex];
				console.log(`Point: ${pas.point} Score: ${pas.score}`);
			}

			b.placeAMove(b.returnBestMove(), b.COMPUTER);
			b.displayBoard();
		}

		if (b.hasXWon()) {
			console.log("Unfortunately, you lost!");
		}
		else if (b.hasOWon()) {
			console.log("You win!  This is not going to get printed.");
		}
		else {
			console.log("It's a draw!");
		}
	}
}



class Random {

	// Returns a random integer between min (included) and max (excluded)
	// Using Math.round() will give you a non-uniform distribution!
	static nextInt(max) {

		let min = 0;

  		min = Math.ceil(min);
  		max = Math.floor(max);
  		return Math.floor(Math.random() * (max - min)) + min;

	}

}
