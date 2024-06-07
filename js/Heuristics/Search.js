class Search{
    representation;
    evaluationFunction;
    mc;

    constructor(r, e, chart){
        this.representation = r;
        this.evaluationFunction = e;
        this.mc = chart;
    }
    
    firstImprovement(){
        // Go through each bit and if we get an improvement, accept, otherwise swap back
        let currentBestSolution = this.evaluationFunction.evaluateCurrentSolution();
        let newSolution;
        let improvement = true;

        while (improvement){
            this.representation.alterSolution();
            newSolution = this.evaluationFunction.evaluateCurrentSolution();
            if (newSolution < currentBestSolution){
                currentBestSolution = newSolution; 
                let x = this.representation.getRepresentation();
                let y = currentBestSolution;
                this.mc.updateChart(x,y);  
            } else{
                this.representation.getOldSolutionBack();
                improvement = false;
            }
        }
    }

    mutation(){
        // randomly change to another point in the domain
        let x = Math.floor(Math.random() * (domain-1));
        this.representation.setNewCurrentSolution(x);
        this.mc.updateChart(x,eval(equation));  
    }
}