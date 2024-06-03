const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let x = 0;
let y = 0;

canvas.addEventListener('mousedown', (e) => {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    x = 0;
    y = 0;
    predict()
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

async function predict() {
    if (!window.myModel) {
        console.log("No loaded model");
        return;
    }

    // Capture the canvas content
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Create an off-screen canvas to resize the image
    const offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = 64;
    offScreenCanvas.height = 64;
    const offScreenCtx = offScreenCanvas.getContext('2d');

    // Draw the captured image data onto the off-screen canvas and resize it
    offScreenCtx.putImageData(imgData, 0, 0);
    offScreenCtx.drawImage(canvas, 0, 0, 64, 64);

    // Get the resized image data
    const resizedImageData = offScreenCtx.getImageData(0, 0, 64, 64);

    // Convert the image data to a tensor and preprocess it
    const input = tf.browser.fromPixels(resizedImageData)
        .toFloat()
        .div(tf.scalar(255))
        .expandDims(0); // Add a batch dimension

    // Make a prediction
    const prediction = await window.myModel.predict(input).data();
    const highestValueIndex = prediction.indexOf(Math.max(...prediction));
    console.log(highestValueIndex);
}