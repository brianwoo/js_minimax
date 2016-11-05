import {Point} from "./Point.js";
import {PointsAndScores} from "./PointsAndScores.js";
import {Scanner} from "./Scanner.js";

export class Board {
    
    constructor() {
        console.log("Board ctor");
        this.availablePoints = new Array();
        this.scanner = new Scanner();
        this.board = [[0,0,0], [0,0,0], [0,0,0]];
        this.rootsChildrenScores = new Array();
        
        this.player1 = 1; // X
        this.player2 = 2; // O
        
        // temporary set this.
        this.COMPUTER = this.player1;
        this.HUMAN = this.player2;
        
    }
    
    isGameOver() {

		//console.log("here");
		//console.log("getAvailableStates=" + getAvailableStates().length);

        //Game is over is someone has won, or board is full (draw)
        return (this.hasXWon() || 
                this.hasOWon() || 
                this.getAvailableStates().length == 0);
    }
    
    
    hasPlayerWon(player) {
        
        if ((this.board[0][0] == this.board[1][1] &&
             this.board[0][0] == this.board[2][2] &&
             this.board[0][0] == player) 
           ||
           (this.board[0][2] == this.board[1][1] &&
            this.board[0][2] == this.board[2][0] &&
            this.board[0][2] == player)) {
            
            // X Diagonal Win
            return true;
        }
        
        for (let i = 0; i < 3; i++) {
            if ((this.board[i][0] == this.board[i][1] &&
                 this.board[i][0] == this.board[i][2] &&
                 this.board[i][0] == player)
                ||
                (this.board[0][i] == this.board[1][i] && 
                 this.board[0][i] == this.board[2][i] && 
                 this.board[0][i] == 1)) {
                
                // X Row or Column win
                return true;
            }
        }
    }
    
    hasXWon() {
        this.hasPlayerWon(1); // Player1 == X
    }
    
    hasOWon() {
        this.hasPlayerWon(2); // Player2 == O
    }
    
    
    getAvailableStates() {
        
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (this.board[i][j] == 0) {
                    this.availablePoints.push(new Point(i,j));
                }
            }
        }
		return this.availablePoints;
    }
    
    
    placeAMove(point, player) {
        this.board[point.x][point.y] = player; // player1 = X, 2 = O    
    }
    
    
    returnBestMove() {
        
        let MAX = -100000;
        let best = -1;
        
        for (let i=0; i < this.rootsChildrenScores.length; i++) {
            if (MAX < this.rootsChildrenScores[i].score) {
                MAX = this.rootsChildrenScores[i].score;
                best = i;
            }
        }
        
        return this.rootsChildrenScores[best].point;
    }
    
    
    takeHumanInput() {
        console.log("Your move: ");
        let point = this.scanner.doPrompt();
        this.placeAMove(point, this.HUMAN);
    }
    
    
    displayBoard() {
        console.log("============");
        
        for (let i=0; i < 3; i++) {

			let row = "";

            for (let j=0; j < 3; j++) {
                row += this.board[i][j] + " ";
            }

			console.log(row);
            console.log(" ");
        }
    }
    
    returnMin(list) {
        let min = Number.MAX_SAFE_INTEGER;
        let index = -1;
        for (let i=0; i < list.length; i++) {
            if (list[i] < min) {
                min = list[i];
                index = i;
            }
        }
        
        return list[index];
    }
    
    returnMax(list) {
        let max = Number.MIN_SAFE_INTEGER;
        let index = -1;
        for (let i=0; i < list.length; i++) {
            if (list[i] > max) {
                max = list[i];
                index = i;
            }
        }
        
        return list[index];
    }
    
    
    callMinimax(depth, turn) {
        this.minimax(depth, turn);
    }
    
    
    minimax(depth, turn) {
        
        if (this.hasXWon()) return +1;
        if (this.hasOWon()) return -1;
        
        let pointsAvailable = this.getAvailableStates();
        if (pointsAvailable.length == 0) return 0;
        
        let scores = new Array();
        
        for (let i=0; i < pointsAvailable.length; i++) {
            let point = pointsAvailable[i];
            
            if (turn == this.COMPUTER) {
                this.placeAMove(point, this.COMPUTER);
                
                let currentScore = this.minimax(depth + 1, this.HUMAN);
                scores.push(currentScore);
                
                if (depth == 0) {
                    this.rootsChildrenScores.push(
                        new PointsAndScores(currentScore, point));
                }
            }
            else if (turn == this.HUMAN) {
                this.placeAMove(point, this.HUMAN);
                
                let currentScore = this.minimax(depth + 1, this.COMPUTER);
                scores.push(currentScore);
            }
            
            this.board[point.x][point.y] = 0; // Reset this point
        }
        
        return (turn == 1) ? this.returnMax(scores) : this.returnMin(scores);
    }
    
    
}
