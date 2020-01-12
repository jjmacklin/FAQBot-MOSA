# FAQBot - MOSA Hackathon - Winter 2020

FAQBot is an interactive Slack chat bot designed to assist new MCIT students with questions they have upon on-boarding to the program. 

### Tutorial

To create an app using the Bolt Framework [Slack's Bolt Framework](https://slack.dev/bolt/tutorial/getting-started) for node.js.

### Demo Video
* [FAQBot] (https://youtu.be/n3St1_A9jyc)

### Slack API & features used in the app

* The [`app_home_opened`](https://api.slack.com/events/app_home_opened) event gets triggered when a user opens the bot's "app home" for the first time
* The app uses the Bolt's `say` method to send a welcome message to the user
* Cnversations are initiated with key words

### Requirements

* A Bot User must be added to your App
* Your App must be subscribed to [Events API](https://api.slack.com/events-api)
* Your app needs to be subscribed to the events mentioned in the *Events* section

### Scopes

* [`chat:write`](https://api.slack.com/scopes/chat:write)

### Conversations

* Scripts can be written as code blocks, and GitHub has several repositories with examples for optimizing code structure



