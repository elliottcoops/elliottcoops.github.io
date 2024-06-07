window.myModel = null;

async function testModel() {
    window.myModel = await tf.loadLayersModel('../model_js/model.json');
    console.log("Model loaded into global");
}

testModel();
