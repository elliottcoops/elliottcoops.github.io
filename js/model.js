async function testModel() {
    const model = await tf.loadLayersModel('../model_js/model.json');
    console.log('success');
}


testModel();