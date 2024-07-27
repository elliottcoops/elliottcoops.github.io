window.myModel = null;

async function testModel() {
    try {
        myModel = await tf.loadLayersModel('https://raw.githubusercontent.com/elliottcoops/elliottcoops.github.io/main/model_js/model.json');
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading the model:', error);
    }
}

testModel();
