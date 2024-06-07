const domain = 7;
// const equation = "Math.sin(x) + Math.cos(2*x)";
const equation = "1 / (Math.sin(x) + (0.5 * Math.sin(2*x)) + (0.25 * Math.sin(4*x)) + (0.1 * Math.pow(x,2)))"

class CustomChart {
    constructor(){
        this.xValues = [];
        this.yValues = [];
        this.xValues2 = [];
        this.yValues2 = [];
        this.generateData(equation, 0, domain, 0.1);
    }

    generateData(value, i1, i2, step = 0.1) {
        for (let x = i1; x <= i2; x += step) {
            this.yValues.push(eval(value));
            this.xValues.push(x);
        }

        x = 0  ; // STARTING POSITION TO BE
        this.yValues2.push(eval(value));
        this.xValues2.push(x);
    }

    createChart(canvasID, title){
        var myChart = new Chart(canvasID, {
            type: "line",
            data: {
                labels: this.xValues,
                datasets: [{
                    fill: false,
                    pointRadius: 0,
                    borderColor: "rgba(0,0,0,0.4)",
                    data: this.xValues.map((x, index) => ({x: x, y: this.yValues[index]})) // Store both x and y values
                },
                {
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: "rgba(120,1,1,1)", // Set the fill color of the points
                    data: this.xValues2.map((x, index) => ({x: x, y: this.yValues2[index]})) // yValues2 represents data for the second line
                }]
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: title,
                    fontSize: 16
                },
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom',
                        ticks: {
                            display: true, // Show x-axis labels
                            beginAtZero: true // Start x-axis from zero
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'X Axis'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            display: true, // Show y-axis labels
                            beginAtZero: true // Start y-axis from zero
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'Y Axis'
                        }
                    }]
                }
            }
        });

        return myChart;
    }
}

// Create an instance of the CustomChart class
const customChart = new CustomChart();
// Create the chart
const myChart = customChart.createChart("myChart", "Local Search (Heuristic)");

const customChart2 = new CustomChart();
// Create the chart
const myChart2 = customChart.createChart("myChart2", "Iterated Local Search (Metaheuristic)");


