// Equations

let equations = ["1 / (Math.sin(x) + (0.5 * Math.sin(2*x)) + (0.25 * Math.sin(4*x)) + (0.1 * Math.pow(x,2)))", 
    "Math.sin(x) + Math.cos(2*x)"
]

let equation = 0;

function changeEquation(){
    equation++;
    if (equation >= equations.length){
        equation = 0;
    }
    
    heuristicChartController.redraw(equations[equation], "myChart");
    metaheuristicChartController.redraw(equations[equation], "myChart2");
    heuristicEvaluationFunction.updateEquation(equations[equation]);
    metaheuristicEvaluationFunction.updateEquation(equations[equation]);
}


// Iterations
function changeIters(iters) {
    let i = parseInt(iters);
    heuristicRunner.setIters(i);
    metaheuristicRunner.setIters(i);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const slider = document.getElementById('iterSlider');
    const sliderValue = document.getElementById('iterValue');
  
    // Update the displayed value when the slider is moved
    slider.addEventListener('input', function() {
        changeIters(this.value);

    });
  });

const startingIters = 50;
document.getElementById('mySlider').value = startingIters; 
document.getElementById('sliderValue').innerHTML = startingIters;

// Domain

function changeDomain(newDomian){    
    let nD = parseInt(newDomian);
    heuristicChartController.updateDomain(nD);
    metaheuristicChartController.updateDomain(nD);
    heuristicRepresentation.updateDomain(nD);
    metaheuristicRepresentation.updateDomain(nD);
    heuristicChartController.redraw(equations[equation], "myChart");
    metaheuristicChartController.redraw(equations[equation], "myChart2");
    document.getElementById('startSlider').max = nD;
}

document.addEventListener('DOMContentLoaded', (event) => {
    const slider = document.getElementById('mySlider');
    const sliderValue = document.getElementById('sliderValue');
  
    // Update the displayed value when the slider is moved
    slider.addEventListener('input', function() {
      sliderValue.textContent = this.value;
        changeDomain(this.value);

    });
  });

// Equation and domain
const startingDomain = 10;

document.getElementById('mySlider').value = startingDomain; 
document.getElementById('sliderValue').innerHTML = startingDomain;

// Starting position
function changeStartX(startX){
    let sX = parseInt(startX);
    heuristicChartController.updateStartX(sX, heuristicEvaluationFunction.evaluateSolution(sX));
    metaheuristicChartController.updateStartX(sX, heuristicEvaluationFunction.evaluateSolution(sX));
}

document.addEventListener('DOMContentLoaded', (event) => {
    const slider = document.getElementById('startSlider');
    const sliderValue = document.getElementById('startValue');
  
    // Update the displayed value when the slider is moved
    slider.addEventListener('input', function() {
      sliderValue.textContent = this.value;
      changeStartX(this.value);

    });
  });

const startX = 1;
document.getElementById('startSlider').max = 10;
document.getElementById('startValue').innerHTML = 1;

