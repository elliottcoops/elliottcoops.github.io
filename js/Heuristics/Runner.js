class Runner {

    heuristics;
    representation;
    evaluation;
    chartController;
    interupt;
    iters;

    constructor(heuristics, representation, evaluation, chartController, iters){
        this.heuristics = heuristics;
        this.representation = representation;
        this.evaluation = evaluation;
        this.chartController = chartController;
        this.interupt = false;
        this.iters = iters; // default
    }

    setIters(iters){
        this.iters = iters;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async runLocalSearch(ils, chartController){
        // Run the search for 100 iterations
        var maxIters = this.iters;
        var currentIter = 0;
        var bestVal;
        
        while (!this.interupt && currentIter++ < maxIters && this.representation.getRepresentation() < this.representation.getDomain() && 
        this.representation.getRepresentation() >= 0){
            if (ils){
                this.heuristics.mutation();
                await this.sleep(20);
            }
            this.heuristics.firstImprovement();
            this.updateBestSolution();
            bestVal = this.evaluation.evaluateSolution(this.representation.bestValueFound);
            this.updateGraphics(chartController, bestVal, currentIter);
            
        }    

        if (currentIter-1 == maxIters){ chartController.updateChart(this.representation.bestValueFound,bestVal); return true;}
        else{ return false;};
        
    }

    updateGraphics(chartController, bestVal, currentIter){
        chartController.updateTitle(bestVal);
    }

    reset(){
        // Setup here
        this.representation.reset(this.chartController.getInitialX());
        this.chartController.reset(this.evaluation.evaluateCurrentSolution());
    }

    updateBestSolution(){
        // Update the best solution
        let currentObjectiveValue = this.evaluation.evaluateCurrentSolution();
        let bestObjectiveValue = this.evaluation.evaluateSolution(this.representation.bestValueFound);

        if (currentObjectiveValue <= bestObjectiveValue){
            this.representation.setBestValue(this.representation.getRepresentation());
        }

    }
}

// Heuristic chart
let heuristicChartController = new CustomChart(equations[equation], startingDomain, startX);
heuristicChartController.createChart("myChart", "Local Search (Heuristic) ~ Best score: ");

// Metaheuristic chart
let metaheuristicChartController = new CustomChart(equations[equation], startingDomain, startX);
metaheuristicChartController.createChart("myChart2", "Iterated Local Search (Metaheuristic) ~ Best score: ");

running = false;
var heuristicRepresentation = new Representation(heuristicChartController.getInitialPoint(), startingDomain);
var heuristicEvaluationFunction = new EvaluationFunction(heuristicRepresentation, equations[equation]);
var heuristics = new Search(heuristicRepresentation, heuristicEvaluationFunction, heuristicChartController);
var heuristicRunner = new Runner(heuristics, heuristicRepresentation, heuristicEvaluationFunction, heuristicChartController, startingIters);

var metaheuristicRepresentation = new Representation(metaheuristicChartController.getInitialPoint(), startingDomain);
var metaheuristicEvaluationFunction = new EvaluationFunction(metaheuristicRepresentation, equations[equation]);
var metaheuristics = new Search(metaheuristicRepresentation, metaheuristicEvaluationFunction, metaheuristicChartController);
var metaheuristicRunner = new Runner(metaheuristics, metaheuristicRepresentation, metaheuristicEvaluationFunction, metaheuristicChartController, startingIters);

async function changeRunState(){
    if (!running){
        heuristicRunner.reset();
        metaheuristicRunner.reset();
        document.getElementById('runBtn').innerHTML = "Restart";
        running=true;
        heuristicRunner.interupt = false;
        metaheuristicRunner.interupt = false;
        let hr = await heuristicRunner.runLocalSearch(false, heuristicChartController);
        let mhr = await metaheuristicRunner.runLocalSearch(true, metaheuristicChartController);   
        if (hr && mhr == true){ running = false;}
    } else {
        running=false;
        heuristicRunner.interupt = true;
        metaheuristicRunner.interupt = true;
        heuristicRunner.reset();
        metaheuristicRunner.reset();
        document.getElementById('runBtn').innerHTML = "Start";
    }
}