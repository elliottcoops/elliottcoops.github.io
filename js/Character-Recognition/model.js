window.myModel = null;

async function testModel() {
    console.log('here');
    window.myModel = await tf.loadLayersModel('../model_js/model.json');
}

testModel();
