// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.
// var express = require('express');
// var router = express.Router();
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

/* GET /mail */
exports.list = function (req, res, next) {
  let parms = { title: 'Inbox', active: { inbox: true } };

  const accessToken = authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    parms.user = userName;

    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });

    try {
      // Get the 10 newest messages from inbox
      client
        .api('/me/mailfolders/inbox/messages')
        .top(10)
        .select('subject,from,toRecipients,receivedDateTime,isRead,body,inferenceClassification,flag,importance')
        .orderby('receivedDateTime DESC')
        .header("Prefer", "outlook.body-content-type=text")
        .get().then(
          function (result) {
            parms.messages = result.value;
            console.log(parms.message);
            res.json(parms);
          },
          function (err) {
            res.status(500).send(err);
          }
        );


    } catch (err) {
      parms.message = 'Error retrieving messages';
      parms.error = { status: `${err.code}: ${err.message}` };
      parms.debug = JSON.stringify(err.body, null, 2);
      res.status(500).send(parms)
    }

  } else {
    // Redirect to home
    res.redirect('/');
  }
}


exports.listPlain = function (req, res, next) {
  let parms = { title: 'Inbox', active: { inbox: true } };

  const accessToken = authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    parms.user = userName;

    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });

    try {
      client
        .api('/me/mailfolders/inbox/messages')
        .top(10)
        .select('subject,from,receivedDateTime,isRead')
        .orderby('receivedDateTime DESC')
        .get().then(
          function (result) {
            parms.messages = result.value;
            console.log(parms.message);
            res.json(parms);
          },
          function (err) {
            res.status(500).send(err);
          }
        );


    } catch (err) {
      parms.message = 'Error retrieving messages';
      parms.error = { status: `${err.code}: ${err.message}` };
      parms.debug = JSON.stringify(err.body, null, 2);
      res.status(500).send(parms)
    }

  } else {
    // Redirect to home
    res.redirect('/');
  }
}







var toneAnalyzer = new ToneAnalyzerV3({
  // If unspecified here, the TONE_ANALYZER_USERNAME and TONE_ANALYZER_PASSWORD environment properties will be checked
  // or TONE_ANALYZER_IAM_APIKEY if is available
  // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
  iam_apikey: 'yYjSArjCNnWa_U3O2QDG58jscEbYryOGwqo5TpZBqtO_',
  version: '2017-09-21',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
});


exports.toneAnalyse = function (req, res, next) {

  if (!req.body) {
    res.status(400).send({ message: "content cannot be Empty" });
  }

  toneAnalyzer.tone(req.body, function (err, data) {
    if (err) {
      return next(err);
    }
    if (req.body.tone_input.toLowerCase().includes("escalation")||
    req.body.tone_input.toLowerCase().includes("breathing fire") ||
    req.body.tone_input.toLowerCase().includes("sick to your stomach")||
    req.body.tone_input.toLowerCase().includes("hopping mad") ||
    req.body.tone_input.toLowerCase().includes("keep on") ||
    req.body.tone_input.toLowerCase().includes("reject") ||
    req.body.tone_input.toLowerCase().includes("rejecting")   
    ) {
      data.document_tone.tones = [{
        tone_name: "Anger"
      }]
    }
    return res.json(data);
  });
}


exports.listMeetings = function (req, res, next) {
  let parms = { title: 'Inbox', active: { inbox: true } };

  const accessToken = authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    parms.user = userName;

    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });

    try {
      var today = new Date();
      var tomorrow = new Date();
      today.setHours(0, 0, 0, 0);
      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);
      var startDate = today.toISOString();
      var enddate = tomorrow.toISOString();
      // Get the 10 newest messages from inbox
      client
        .api('/me/calendar/calendarView?startDateTime=' + startDate + '&endDateTime=' + enddate)

        .get().then(
          function (result) {
            return res.json(result);
          },
          function (err) {
            res.status(500).send(err);
          }
        );


    } catch (err) {
      parms.message = 'Error retrieving messages';
      parms.error = { status: `${err.code}: ${err.message}` };
      parms.debug = JSON.stringify(err.body, null, 2);
      res.status(500).send(parms)
    }

  } else {
    // Redirect to home
    res.redirect('/');
  }
}