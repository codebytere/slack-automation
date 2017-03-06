Slack Invite Automation

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
## Settings

You can set variables for your own purpose in `config.js` or environment variables.

### `config.js`

Fill out `config.js` as your infomation.

* `community`: Your community or team name to display on join page.
* `slackUrl` : Your Slack team url (ex.: socketio.slack.com)
* `slacktoken` : Your access token for Slack.
  - You can generate it in <https://api.slack.com/web#auth>.
  - **You should generate the token in admin user, not owner.**
  If you generate the token in owner user, a `missing_scope` error may occur.
* `locale`: Application language (currently `de`, `en`, `es`, `fr`, `ja`, `ko`, `pl`, `pt`, `pt-BR`, `tr`, `zh-CN` and `zh-TW` available).

### Environment Variables
You can set environment variables directly or in `.env` file.
If you want to use a `.env` file, create a file in the root called `.env` with the following key/value pairs.
(`.env` files are added to the `.gitignore`.)

- `COMMUNITY_NAME` : Your community or team name to display on join page.
- `SLACK_URL` : Your Slack team url (ex.: socketio.slack.com)
- `SLACK_TOKEN` : Your access token for Slack.
  - You can generate it in <https://api.slack.com/web#auth>.
  - **You should generate the token as an admin user, not owner.**
  If you generate the token in owner user, a `missing_scope` error may occur.
- `INVITE_TOKEN`: An optional security measure - if it is set, then that token will be required to get invited.
- `LOCALE`: Application language (currently `de`, `en`, `es`, `fr`, `ja`, `ko`, `pl`, `pt`, `pt-BR`, `tr`, `zh-CN` and `zh-TW` available).

## Run
[Node.js](http://nodejs.org/) is required.

```shell
$ git clone git@github.com:outsideris/slack-invite-automation.git
$ cd slack-invite-automation
$ npm install
$ npm start
```

You can access <http://localhost:3000> on your web browser.
