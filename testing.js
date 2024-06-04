async function loadModel() {
    const model = await tf.loadLayersModel('model_js/model.json');
    console.log('Model loaded successfully');

    // // Example: Use the model to make a prediction
    // const input = tf.tensor([/* your input data here */]);
    // const prediction = model.predict(input);
    // prediction.print(); // or process the prediction further
}

loadModel();