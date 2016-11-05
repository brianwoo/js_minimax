import {Point} from "./Point.js";

export class Scanner {
    
    constructor() {
        
        this.x = -1;
        this.y = -1;
    }
    
    /************************
    * Index needs to be between
    * 0 - 2.  Return true if so.
    ************************/
    checkIndex(index) {
        return (index >= 0 && index <= 2);
    }
    
        
	doPromptOneNum() {
		let whoMoveFirst = prompt(
			"Who's gonna move first? (1)Computer (2)User: ");

		return whoMoveFirst;
	}

    
    doPrompt() {
        
        let isDone = false;
        
        while (!isDone) {
            
            let xAndY = prompt("enter X Y");
            if (!xAndY)
                continue;
            
            let [x, y] = xAndY.split(" ");

            console.log("x=" + x);
            console.log("y=" + y);

            if (this.checkIndex(x) && this.checkIndex(y)) {
                return new Point(x, y);
            }        
        }

    }
    
    
}
