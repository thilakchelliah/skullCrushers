// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.
// var express = require('express');
// var router = express.Router();
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');

/* GET /mail */
exports.list =  function (req, res, next) {
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
        .select('subject,from,receivedDateTime,isRead')
        .orderby('receivedDateTime DESC')
        .get().then(
          function(result){
            parms.messages = result.value;
            console.log(parms.message);
            res.json(parms);
          },
          function(err){
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


