class Representation{
    
    currentSolution;
    bestValueFound;

    constructor(initialX){
        this.currentSolution = initialX;
        this.bestValueFound = this.currentSolution;
    }

    getRepresentation(){ return this.currentSolution;}

    setBestValue(bestValue){ this.bestValueFound = bestValue;}

    setNewCurrentSolution(newCurrentSolution){ this.currentSolution = newCurrentSolution;}

    roundValue(){ this.currentSolution = Math.round(this.currentSolution * 10) / 10; }

    alterSolution(){
        // Step in the positive direction
        if (this.currentSolution < domain){
            let step = 0.1 ;
            this.currentSolution += step;
            this.roundValue();
        }
    }

    getOldSolutionBack(){
        // Revert back to the previous stage if there is a worse move
        if (this.currentSolution > 0){
            let step = 0.1;
            this.currentSolution -= step;
            this.roundValue();
        }
    }
}