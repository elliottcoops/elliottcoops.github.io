class Search{
    representation;
    evaluationFunction;
    mc;

    constructor(r, e, chart){
        this.representation = r;
        this.evaluationFunction = e;
        this.mc = chart;
    }

    updatePoint(x, y) {
        this.mc.data.datasets[1].data.pop();
        let x_ = [x];
        let y_ = [y];
        this.mc.data.datasets[1].data = x_.map((x, index) => ({x: x, y: y_[index]}));
        this.mc.update();
    }
    
    firstImprovement(){
        // Go through each bit and if we get an improvement, accept, otherwise swap back
        let currentBestSolution = this.evaluationFunction.evaluateCurrentSolution();
        let newSolution;
        for (let i = 0; i < 8; i++){
            this.representation.alterSolution();
            newSolution = this.evaluationFunction.evaluateCurrentSolution();
            if (newSolution < currentBestSolution){
                currentBestSolution = newSolution; 
            } else{
                this.representation.getOldSolutionBack();
            }
        }
        // break;
        let x = this.representation.getRepresentation();
        let y = currentBestSolution;
        this.updatePoint(x,y);  
    }

    mutation(){
        // randomly change to another point in the domain
        let x = Math.floor(Math.random() * (domain-1));
        this.representation.sr(x);
        this.updatePoint(x, eval(equation));
    }

    updateBestSolution(){
        let currentObjectiveValue = this.evaluationFunction.evaluateCurrentSolution();
        let bestObjectiveValue = this.evaluationFunction.evaluateSolution(this.representation.bestValueFound);

        if (currentObjectiveValue <= bestObjectiveValue){
            this.representation.setBestValue(this.representation.getRepresentation());
            console.log(bestObjectiveValue)
        }

    }
}

class Representation{
    
    value;
    bestValueFound;
    mc;

    constructor(chart){
        this.mc = chart;
        this.setRepresentation()
        this.bestValueFound = this.value;
    }

    setRepresentation(){
        const points = [];
        const dataset = this.mc.data.datasets[1].data; // Assuming we're interested in the first dataset
        dataset.forEach(point => {
            points.push({ x: point.x, y: point.y });
        });

        this.value = points[0].x;
    }

    getRepresentation(){ return this.value;}

    setBestValue(val){
        this.bestValueFound = val;
    }

    sr(newVal){
        this.value = newVal;
    }

    roundValue(){
        this.value = Math.round(this.value * 10) / 10;
    }
    alterSolution(){
        if (this.value < domain){
            let step = 0.1 ;
            this.value += step;
            this.roundValue();
        }
    }

    getOldSolutionBack(){
        if (this.value > 0){
            let step = 0.1;
            this.value -= step;
            this.roundValue();
        }
    }
}

class EvaluationFunction{
    representation;

    constructor(r){
        this.representation = r;
    }

    evaluateCurrentSolution(){
        let x = this.representation.getRepresentation();
        let objectiveValue = eval(equation);
        return objectiveValue; 
    }

    evaluateSolution(sol){
        let x = sol;
        let objectiveValue = eval(equation);
        return objectiveValue; 
    }
}

class Runner {

    ls;
    rep;
    eval;

    constructor(ls, rep, ev){
        this.ls = ls;
        this.rep = rep;
        this.eval = ev
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async runLocalSearch(ils, chart){
        var maxIters = 100;
        var currentIter = 0;

        let title = chart.options.title.text
    
        while (currentIter++ < maxIters && this.rep.getRepresentation() < domain && this.rep.getRepresentation() >= 0){
            await this.sleep(1000);
            if (ils){
                this.ls.mutation();
                await this.sleep(1000);
            }
            this.ls.firstImprovement();
            this.ls.updateBestSolution();

            chart.options.title.text = title + " " + this.eval.evaluateSolution(this.rep.bestValueFound);
            chart.update(); // Update the chart to reflect the changes
     }
    }
}


var rep = new Representation(myChart);
var e = new EvaluationFunction(rep);
var ls = new Search(rep, e, myChart);
var runner = new Runner(ls, rep, e);
runner.runLocalSearch(false, myChart);

var rep2 = new Representation(myChart2);
var e2 = new EvaluationFunction(rep2);
var ls2 = new Search(rep2, e2, myChart2);
var runner2 = new Runner(ls2, rep2, e2);
runner2.runLocalSearch(true, myChart2);