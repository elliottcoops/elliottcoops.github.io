class Representation{
    
    currentSolution;
    bestValueFound;
    domain;

    constructor(initialX, domain){
        this.currentSolution = initialX;
        this.bestValueFound = this.currentSolution;
        this.domain = domain;
    }

    reset(initialX){
        this.currentSolution = initialX;
        this.bestValueFound = this.currentSolution;
    }

    getRepresentation(){ return this.currentSolution;}

    setBestValue(bestValue){ this.bestValueFound = bestValue;}

    setNewCurrentSolution(newCurrentSolution){ this.currentSolution = newCurrentSolution;}

    roundValue(){ this.currentSolution = Math.round(this.currentSolution * 10) / 10; }

    alterSolution(){
        // Step in the positive direction
        if (this.currentSolution < this.domain){
            this.currentSolution += 0.1;
            this.roundValue();
        }
    }

    getOldSolutionBack(){
        // Revert back to the previous stage if there is a worse move
        if (this.currentSolution > 0){
            this.currentSolution -= 0.1;
            this.roundValue();
        }
    }

    updateDomain(newDomain){ this.domain = newDomain;}

    getDomain(){ return this.domain;}
}