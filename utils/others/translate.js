


require('dotenv/config');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

const translate = async (text, lang) => {

    return new Promise(function (resolve, reject) {

        axios({
            baseURL: process.env.EDPOINT,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.TRANSLATE_API,
                'Ocp-Apim-Subscription-Region': process.env.TRANSLATE_LOCATION,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'to': lang,
                'includeSentenceLength': true
            },
            data: [{
                'text': text
            }]
        }).then(function (response) { 
            const langString = JSON.stringify(response.data);
            const obj = JSON.parse(langString);
            const msg = obj[0]["translations"][0]["text"];

            resolve(msg);
        }).catch(e => {
            reject(e);
        })
    })
}


module.exports = translate;