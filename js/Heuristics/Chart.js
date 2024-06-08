class CustomChart {

    chart;
    title;
    domain;
    startX;
    equation;

    constructor(equation, domain, startX) {
        // Set x and y values of the chart
        this.xValues = [];
        this.yValues = [];
        this.xValues2 = [];
        this.yValues2 = [];
        this.domain = domain;
        this.startX = startX;
        this.equation = equation;

        // Generate the data for the given equation in the domain [0,domain] with a step of 0.1
        this.generateData(equation, 0, this.domain, 0.1);
    }

    updateDomain(domain){ this.domain = domain;}

    updateStartX(startX, y){ 
        this.startX = startX;
        this.updateChart(this.startX, y);
    }

    redraw(equation, canvasID){
        this.generateData(equation, 0, this.domain, 0.1);
        return this.createChart(canvasID, this.title);
    }

    getInitialPoint(){
        const points = [];
        const dataset = this.chart.data.datasets[1].data; // Assuming we're interested in the first dataset
        dataset.forEach(point => {
            points.push({ x: point.x, y: point.y });
        });

        return points[0].x;
    }

    getInitialX(){
       return this.startX;
    }

    generateData(value, i1, i2, step = 0.1) {
        // Push all values from the equation onto x and y arrays
        this.xValues = [];
        this.yValues = [];
        this.xValues2 = [];
        this.yValues2 = [];

        for (let x = i1; x <= i2; x += step) {
            this.yValues.push(eval(value));
            this.xValues.push(x);
        }

        // Set the starting position of the point 
        let x = this.startX;
        this.yValues2.push(eval(value));
        this.xValues2.push(this.startX);
    }

    createChart(canvasID, title) {
        // Create the chart variable
        this.chart = new Chart(canvasID, {
            type: "line",
            data: {
                labels: this.xValues,
                datasets: [{
                    fill: false,
                    pointRadius: 0,
                    borderColor: "rgba(0,0,0,0.4)",
                    data: this.xValues.map((x, index) => ({x: x, y: this.yValues[index]})) 
                },
                {
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: "rgba(120,1,1,1)", 
                    data: this.xValues2.map((x, index) => ({x: x, y: this.yValues2[index]})) 
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
                            display: true, 
                            beginAtZero: true 
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'X Axis'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            display: true, 
                            beginAtZero: true 
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'Y Axis'
                        }
                    }]
                }
            }
        });

        this.title = this.chart.options.title.text;

        return this.chart;
    }

    updateChart(x, y) {
        // Update the chart with new point at (x,y)
        this.chart.data.datasets[1].data.pop();
        let x_ = [x];
        let y_ = [y];
        this.chart.data.datasets[1].data = x_.map((x, index) => ({x: x, y: y_[index]}));
        this.chart.update();
    }

    updateTitle(currentBestSolution) {
        // Update the title with the best current score
        this.chart.options.title.text = this.title + " " + currentBestSolution.toFixed(2);
        this.chart.update(); // Update the chart to reflect the changes
    }

    reset(y){
        let x = this.getInitialX();
        
        this.updateChart(x, y);
        this.updateTitle(y);
        this.chart.update();
    }
}



