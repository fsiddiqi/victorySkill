/**
 * Small fun Alex Skill to play a declare victory
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to "
 *  Alexa: "You Win"
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Victory is a child of AlexaSkill.
 */
var Victory = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Victory.prototype = Object.create(AlexaSkill.prototype);
Victory.prototype.constructor = Victory;

Victory.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Victory onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Victory.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Victory onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to Victory, you can say victory";
    var repromptText = "You can say victory";
    response.ask(speechOutput, repromptText);
};

Victory.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Victory onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Victory.prototype.intentHandlers = {
    // register custom intent handlers
    "VictoryIntent": function (intent, session, response) {
       var victoryPrompt = "You Win!!  Go you!!"; 
       var speechOutput = {
            speech: "<speak>Victory is yours!"
                + "<audio src='https://dl.dropboxusercontent.com/u/499511/victory.mp3'/>"
                + victoryPrompt
                + "</speak>",
            type: AlexaSkill.speechOutputType.SSML
        };
        response.tellWithCard(speechOutput, "Greeter", "You Won! Go you!");
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask me to declare victory!", "You can say Victory!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var victory = new Victory();
    victory.execute(event, context);
};

