var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const render = (imgURL) => new Promise((resolve, reject) => {

    var b = JSON.stringify({ "requests": [{ "image": { "source": { "imageUri": imgURL } }, "features": [{ "type": "TEXT_DETECTION", "maxResults": 1 }] }] });
    var e = new XMLHttpRequest;

    e.onload = async function () {

        const obj = JSON.parse(e.responseText);
        const result = await obj["responses"][0]["textAnnotations"][0]["description"];
        resolve(result);

    }
    e.open("POST", `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION}&alt=json`);
    e.send(b)
})


module.exports = { render }
