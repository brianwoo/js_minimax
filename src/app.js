'use strict';

import {Point} from "./classes/Point.js";
import {PointsAndScores} from "./classes/PointsAndScores.js";
import {Scanner} from "./classes/Scanner.js";
import {TicTacToe} from "./classes/TicTacToe.js";

class Test {
    
    constructor() {
        console.log("Test here!");
    }
    
    testPoint() {
        
        let point1 = new Point(5, 6);
        console.log(`point1=${point1.toString()}`);
        
        let ptAndScores1 = new PointsAndScores(123, point1);
        console.log(`point1 from ptAndScores1=${ptAndScores1.point.toString()}`);
        console.log(`score from ptAndScores1=${ptAndScores1.score}`);
    }
    
    
}

//let a = new Array();
//console.log("a=" + a.length);

let ticTacToe = new TicTacToe();
ticTacToe.main();


//let test = new Test();
//test.testPoint();

//let scanner = new Scanner();
//let pt = scanner.doPrompt();
//console.log(`x=${pt.x} y=${pt.y}`);


