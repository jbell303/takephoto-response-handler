/* index.js
  node.js response handler for Alexa response lambda function
  usage: upload zipped project folder to AWS lambda
  ensure Alexa skill is used as input to lambda function

  James and Audrey Bell 2018
*/

'use strict';
const Alexa = require('ask-sdk');
var http = require('http');
const URL = 'http://alexaraspicam.ngrok.io/photo'; // unique tunneling url to raspberry pi server

const APP_ID = 'amzn1.ask.skill.41fd0b69-d293-4ab6-9292-3496b2a89f1c';

const SKILL_NAME = 'Raspberry Pie';
const HELP_MESSAGE = 'I can take a photo using your raspberry pie... Just tell me to take a picture';
const HELP_REPROMPT = 'If you want me to take a photo of you, just say take a picture';
const STOP_MESSAGE = 'Goodbye!';

const LaunchRequestHandler = {
    canHandle() {
        return handlerInput.requestEnvelope.request.type === "LaunchRequest";
    },
    handle(handlerInput, error) {
        console.log("IN LAUNCH REQUEST");
        return handlerInput.responseBuilder
            .speak(HELP_MESSAGE)
            .getResponse();
    },
};

const CameraControlHandler = {
    canHandle() {
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
                handlerInput.requestEnvelope.intent.name === "cameraControlIntent";
    },
    handle(handlerInput, error) {
        console.log("IN CAMERA CONTROL REQUEST");
        return new Promise((resolve) => {
            http.get(URL, function(res) {
                console.log("Response: " + res.statusCode);
            }).on('error', function(e) {
                console.log("Error: " + e.message);
            });
            console.log('end request to ' + URL);
            
            resolve(handlerInput.responseBuilder
            .speak("You asked me to take a picture.")
            .getResponse());
        })
    },
};

const HelpHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
               handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent";
    },
    handle(handlerInput, error) {
        console.log("IN " + handlerInput.requestEnvelope.request.intent.name.toUpperCase())
        return handlerInput.responseBuilder
                .speak(HELP_MESSAGE)
                .reprompt(HELP_REPROMPT)
                .getResponse();
    }
};

const StopHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
               (handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent" ||
                handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent");
    },
    handle(handlerInput, error) {
        console.log("IN " + handlerInput.requestEnvelope.request.intent.name.toUpperCase())
        return handlerInput.responseBuilder
                .speak(STOP_MESSAGE)
                .getResponse();
    }
};

// define Request Log and Error Handler
const RequestLog = {
    process(handlerInput) {
        console.log("REQUEST ENVELOPE = " + JSON.stringify(handlerInput.requestEnvelope));
        return;
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log("Error Handled: " + JSON.stringify(error.message));
        console.log("handlerInput: " + JSON.stringify(handlerInput));
        return handlerInput.responseBuilder
            .speak("Sorry, I can\'t understand the command. Please try again.")
            .getResponse();
    },
};

exports.handler = Alexa.SkillBuilders.standard()
.addRequestHandlers(
        LaunchRequestHandler,
        CameraControlHandler,
        HelpHandler,
        StopHandler
    )
    .addRequestInterceptors(RequestLog)
    .addErrorHandlers(ErrorHandler)
    .lambda();
