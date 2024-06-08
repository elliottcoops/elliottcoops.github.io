class EvaluationFunction{

    representation;
    equation;

    constructor(representation, equation){
        // Set the representation reference
        this.representation = representation;
        this.equation = equation;
    }

    evaluateCurrentSolution(){
        // Evaluate the current solution of which is being stored
        let x = this.representation.getRepresentation();
        let objectiveValue = eval(this.equation);
        return objectiveValue; 
    }

    evaluateSolution(solutionToEvaluate){
        // Evaluate a given solution
        let x = solutionToEvaluate;
        let objectiveValue = eval(this.equation);;
        return objectiveValue; 
    }

    updateEquation(equation){ this.equation = equation;}

}