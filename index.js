/* index.js
  node.js response handler for Alexa response lambda function
  usage: upload zipped project folder to AWS lambda
  ensure Alexa skill is used as input to lambda function

  James and Audrey Bell 2018
*/

'use strict';
const Alexa = require('alexa-sdk');
var http = require('http');
const URL = 'http://alexaraspicam.ngrok.io/photo'; // unique tunneling url to raspberry pi server

const APP_ID = 'amzn1.ask.skill.41fd0b69-d293-4ab6-9292-3496b2a89f1c';

const SKILL_NAME = 'Raspberry Pie';
const HELP_MESSAGE = 'I can take a photo using your raspberry pie... Just tell me to take a picture';
const HELP_REPROMPT = 'If you want me to take a photo of you, just say take a picture';
const STOP_MESSAGE = 'Goodbye!';

const handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'cameraControlIntent': function () {
        const speechOutput = "taking a picture!";
        this.response.speak(speechOutput);
        this.emit(':responseReady');

        // perform GET request to raspberry pi server
        http.get(URL, function(res) {
            console.log("Response: " + res.statusCode);
        }).on('error', function(e) {
            console.log("Error: " + e.message);
        });
        console.log('end request to ' + URL);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
