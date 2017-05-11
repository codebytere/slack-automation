const express = require('express');
const router = express.Router();
const request = require('request');
const airtable = require('airtable');
const config = require('../config');

const base = new airtable({apiKey: config.airtableKey}).base('app1SGgO3Rp5BuarJ');

router.get('/', (req, res) => { res.render('index'); });
router.post('/invite', (req, res) => {

  // Post information to Airtable base
  base('Community_Members').create({
    name: req.body.name,
    email: req.body.email,
    company: req.body.company,
    school: req.body.school,
  }, (err, record) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  // Post data to the slack endpoint
  request.post({
    url: `https://${config.slackUrl}/api/users.admin.invite`,
    form: {
      email: req.body.email,
      name: req.body.name,
      token: config.slacktoken,
      set_active: true,
    },
  }, (err, httpResponse, body) => {
    if (err) { return res.send(`Error: ${err}`); }
    const parsed_body = JSON.parse(body);

    if (parsed_body.ok) {
      res.render('result', {
        message: `Success! Check ${req.body.email} for an invite from Slack.`,
      });
    } else {
      let error = parsed_body.error;
      if (error === 'already_invited' || error === 'already_in_team') {
        res.render('result', {
          message: `Success! You were already invited.<br>
          Visit <a href="https://${config.slackUrl}">${config.community}</a>`,
        });
        return '';
      } else if (error === 'invalid_email') {
        error = 'The email you entered is an invalid email.';
      } else if (error === 'invalid_auth') {
        error = 'Error. Please contact an admin via Facebook or email.';
      }

      res.render('result', {
        message: `Failed! ${error}`,
        isFailed: true,
      });
    }
    return '';
  });
});

module.exports = router;
