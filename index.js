var http = require('http');
var url = 'http://alexaraspicam.ngrok.io/photo';
const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.41fd0b69-d293-4ab6-9292-3496b2a89f1c';

exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
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

const handlers = {
        'cameraControlIntent' : function() {
            this.emit(':tell', "Taking a picture!");
        }
    }