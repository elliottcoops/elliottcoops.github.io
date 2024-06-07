class Runner {

    heuristics;
    representation;
    evaluation;

    constructor(heuristics, representation, evaluation){
        this.heuristics = heuristics;
        this.representation = representation;
        this.evaluation = evaluation
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async runLocalSearch(ils, chartController){
        // Run the search for 100 iterations
        var maxIters = 100;
        var currentIter = 0;
    
        while (currentIter++ < maxIters && this.representation.getRepresentation() < domain && this.representation.getRepresentation() >= 0){
            await this.sleep(1000);
            if (ils){
                this.heuristics.mutation();
                await this.sleep(1000);
            }
            this.heuristics.firstImprovement();
            this.updateBestSolution();
            
            let number = this.evaluation.evaluateSolution(this.representation.bestValueFound);
            chartController.updateTitle(number);
        }
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
heuristicChartController = new CustomChart();
heuristicChart = heuristicChartController.createChart("myChart", "Local Search (Heuristic) ~ Best score: ");

// Metaheuristic chart
metaheuristicChartController = new CustomChart();
metaheuristicChart = metaheuristicChartController.createChart("myChart2", "Iterated Local Search (Metaheuristic) ~ Best score: ");

// Heuristic run code
var heuristicRepresentation = new Representation(heuristicChartController.getInitialPoint());
var heuristicEvaluationFunction = new EvaluationFunction(heuristicRepresentation);
var heuristics = new Search(heuristicRepresentation, heuristicEvaluationFunction, heuristicChartController);
var heuristicRunner = new Runner(heuristics, heuristicRepresentation, heuristicEvaluationFunction);
heuristicRunner.runLocalSearch(false, heuristicChartController);

// Metaheuristic run code
var metaheuristicRepresentation = new Representation(metaheuristicChartController.getInitialPoint());
var metaheuristicEvaluationFunction = new EvaluationFunction(metaheuristicRepresentation);
var metaheuristics = new Search(metaheuristicRepresentation, metaheuristicEvaluationFunction, metaheuristicChartController);
var metaheuristicRunner = new Runner(metaheuristics, metaheuristicRepresentation, metaheuristicEvaluationFunction);
metaheuristicRunner.runLocalSearch(true, metaheuristicChartController);