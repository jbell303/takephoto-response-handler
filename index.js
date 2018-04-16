/* index.js
  node.js response handler for Alexa response lambda function
  usage: upload zipped project folder to AWS lambda
  ensure Alexa skill is used as input to lambda function

  James and Audrey Bell 2018
*/

// import the necessary packages
var http = require('http');
var url = 'https://alexaraspicam.ngrok.io/photo'; // unique tunneling url to raspberry pi server
const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.41fd0b69-d293-4ab6-9292-3496b2a89f1c'; // unique app id for alexa skill

// AWS Lambda response handler
exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;

    // perform GET request to raspberry pi server
    http.get(url, function(res) {
        console.log("Response: " + res.statusCode);
        callback(null, 'success msg');
    }).on('error', function(e) {
        console.log("Error: " + e.message);
        callback(new Error('failure'));
    });

    console.log('end request to ' + url);

    alexa.registerHandlers(handlers);
    alexa.execute();
};

// Alexa response handler
const handlers = {
        'cameraControlIntent' : function() {
            this.emit(':tell', "Taking a picture!"); // Alexa should vocalize "Taking a picture!"
        }
    }
