const canvas = document.getElementById('drawingCanvas'); // Canvas reference
const ctx = canvas.getContext('2d'); // Canvas contexr
const scale = 320 / 64; // Scale factor between displayed size and actual canvas size

// ctx.fillStyle = 'white'; // Canvas fill
// ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the white background 

// Create a new Image object
const img = new Image();

// Set up the callback to run when the image loads
img.onload = function() {
    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// Set the source of the image
img.src = '../js/Character-Recognition/image.png';  // Replace with the path to your PNG file

let isDrawing = false; // Drawing flag to indicate when in box

// Initial cursor starting position
let x = 0;
let y = 0; 

// Initialise output array
const characters = [];

// Add numbers 0 to 9
for (let i = 0; i < 10; i++) {
    characters.push(String(i));
}

// Add uppercase letters A to Z
for (let i = 65; i < 91; i++) {
    characters.push(String.fromCharCode(i));
}


for (let i = 97; i < 122; i++){
    characters.push(String.fromCharCode(i));
}

// Get the scaled coordinates 
function getScaledCoordinates(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) / scale,
        y: (event.clientY - rect.top) / scale
    };
}

// Handle drawing / mouse down event
canvas.addEventListener('mousedown', (e) => {
    const coords = getScaledCoordinates(e);
    x = coords.x;
    y = coords.y;
    isDrawing = true;
});

// Handle moving the mouse
canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const coords = getScaledCoordinates(e);
        drawLine(ctx, x, y, coords.x, coords.y);
        x = coords.x;
        y = coords.y;
    }
});

// Handle mouse up event
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    x = 0;
    y = 0;
    predict();
});

// Handle moving out the drawing box
canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

// Draw line between two coordinates on the screen
function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.globalAlpha = 1.0; // Fully opaque
    ctx.stroke();
    ctx.closePath();
}

// Clear the canvas from any lines drawn
function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
}

// Predict the character which is on the current screen
async function predict() {
    if (!window.myModel) {
        console.log("No loaded model");
    }

    // Capture the canvas content
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Convert the image data to a tensor and preprocess it
    let input = tf.browser.fromPixels(imgData, 1) // 3 for RGB channels
                .toFloat()
                .div(tf.scalar(255))
                .resizeBilinear([64, 64]) // Resize to the expected input shape
                .expandDims(0); // Add a batch dimension

    input = input.equal(tf.scalar(1)).toFloat().mul(tf.scalar(1)); // Converts boolean mask to float and applies
    
    // Make a prediction
    const prediction = await window.myModel.predict(input).data();
    const highestValueIndex = prediction.indexOf(Math.max(...prediction));
    document.getElementById("predictedText").innerHTML = "Predicted: " + characters[highestValueIndex];
    console.log(characters[highestValueIndex]);
}