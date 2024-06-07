class EvaluationFunction{

    representation;

    constructor(representation){
        // Set the representation reference
        this.representation = representation;
    }

    evaluateCurrentSolution(){
        // Evaluate the current solution of which is being stored
        let x = this.representation.getRepresentation();
        let objectiveValue = eval(equation);
        return objectiveValue; 
    }

    evaluateSolution(solutionToEvaluate){
        // Evaluate a given solution
        let x = solutionToEvaluate;
        let objectiveValue = eval(equation);
        return objectiveValue; 
    }
}