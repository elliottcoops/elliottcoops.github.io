

let equations = ["1 / (Math.sin(x) + (0.5 * Math.sin(2*x)) + (0.25 * Math.sin(4*x)) + (0.1 * Math.pow(x,2)))", 
    "Math.sin(x) + Math.cos(2*x)"
]

let displayEquations = ['1/((sin(x) + (0.5 * sin(2x)) + (0.25 * sin(4x)) + (0.1 * x^2))', 'sin(x) + cos(2x)']
let equation = 0;

document.getElementById('searchSpace').innerHTML = "Search space: " + displayEquations[equation]

function changeEquation(){
    equation++;
    if (equation >= equations.length){
        equation = 0;
    }
    
    heuristicChartController.redraw(equations[equation], "myChart");
    metaheuristicChartController.redraw(equations[equation], "myChart2");
    heuristicEvaluationFunction.updateEquation(equations[equation]);
    metaheuristicEvaluationFunction.updateEquation(equations[equation]);
    document.getElementById('searchSpace').innerHTML = "Search space: " + displayEquations[equation];
}


// Iterations
function changeIters(iters) {
    let i = parseInt(iters);
    heuristicRunner.setIters(i);
    metaheuristicRunner.setIters(i);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const slider = document.getElementById('iterSlider');
    const sliderLabel = document.getElementById('iterSliderValue');
  
    // Update the displayed value when the slider is moved
    slider.addEventListener('input', function() {
        // sliderValue.textContent = this.value;
        sliderLabel.textContent = "Iterations: " + slider.value;
        changeIters(this.value);
        

    });
  });

const startingIters = 50;
document.getElementById('iterSlider').value = startingIters; 
document.getElementById('iterSliderValue').textContent = "Iterations: " + startingIters;;

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
    document.getElementById('domain').innerHTML = "Domain: " + "[0, " + newDomian + "]";
}

document.addEventListener('DOMContentLoaded', (event) => {
    const slider = document.getElementById('domainSlider');
    const sliderLabel = document.getElementById('domainSliderValue');
  
    // Update the displayed value when the slider is moved
    slider.addEventListener('input', function() {
      sliderLabel.textContent = "Domain: " + slider.value;
      changeDomain(this.value);

    });
  });

// Equation and domain
const startingDomain = 10;

document.getElementById('domainSlider').value = startingDomain; 
document.getElementById('domainSliderValue').textContent = "Domain: " + startingDomain;
document.getElementById('domain').innerHTML = "Domain: " + "[0, " + startingDomain + "]";

// Starting position
function changeStartX(startX){
    let sX = parseInt(startX);
    heuristicChartController.updateStartX(sX, heuristicEvaluationFunction.evaluateSolution(sX));
    metaheuristicChartController.updateStartX(sX, heuristicEvaluationFunction.evaluateSolution(sX));
}

document.addEventListener('DOMContentLoaded', (event) => {
    const slider = document.getElementById('startSlider');
    const sliderLabel = document.getElementById('startSliderLabel');
  
    // Update the displayed value when the slider is moved
    slider.addEventListener('input', function() {
      sliderLabel.textContent = "Start X: " + slider.value;
      changeStartX(this.value);
    });
  });

const startX = 1;
document.getElementById('startSlider').max = 10;
document.getElementById('startSlider').value = startX;
document.getElementById('startSliderLabel').textContent = "Start x: " + startX;


