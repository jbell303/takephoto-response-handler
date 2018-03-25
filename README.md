# takephoto-response-handler
response handler for raspicam alexa skill

### Requirements
* Amazon AWS account (for Lambda requests)


### Usage
The zipped contents of this repository can be uploaded to an AWS Lambda function in order to respond to an Alexa skills request. 
Create a new Alexa skill and paste the following into the interaction model:
```
{
  "intents": [
    {
      "intent": "cameraControlIntent"
    }
  ]
}
```
A sample utterance would be `Alexa, tell Raspberry pi to take a picture!`.

See the [raspicam-server](https://github.com/jbell303/raspicam-server.git) repo for details on how to process the request on your raspberry pi. 
