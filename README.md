# FAQBot - MOSA Hackathon - Winter 2020

FAQBot is an interactive Slack chat bot designed to assist new MCIT students with questions they have upon on-boarding to the program. 

### Tutorial

To create an app using the Bolt Framework [Slack's Bolt Framework](https://slack.dev/bolt/tutorial/getting-started) for node.js.

### Demo Video

[FAQBot](https://youtu.be/g-V5slxo0-Q)

### Conversations

Scripts can be written as code blocks, and GitHub has several repositories with examples for optimizing code structure

### Bot Interaction

FAQBot can respond based on a single keyword or multiple words. 
Slack API enables a wide breadth of other integrations which can be coded into FAQBot.
It's helpful to plan out potential responses in advance as well as evaluating conversation flow patterns. 

#### The User initiates the conversation with FAQBot

```
const { App } = require('@slack/bolt');
const store = require('./store');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

//When user clicks on FAQBot App
//Event is triggered which starts the interaction

app.event('app_home_opened', ({ event, say }) => {  
  // Look up the user from DB
  let user = store.getUser(event.user);
  
  if(!user) {
    user = {
      user: event.user,
      channel: event.channel
    };
    store.addUser(user);
    
    say(`Hello there, and welcome <@${event.user}>!`);
  } else {
    say('Hi again!');
  }
  
});


// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

//Upon user saying hello//
//FAQBot provides overview//

app.message('hello', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say({
    blocks: [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `What's up <@${message.user}>? Great to see you here! I can help with Frequently Asked Questions such as:`
      },
    
     },
     {
	    "type": "section",
	    "text": {
	      "type": "mrkdwn",
	      "text": "• Course Difficulty \n • What order to take core classes \n • Where to book Office Hours \n 
                  • Weekly hours spent on homework"
	   }
     },  
    ]
  });
});

//Same as above greeting message but including Direct Mention
//FAQBot responds with 'hello' message

app.event ('app_mention', ({ event, say }) => {
  say({
    blocks: [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `What's up? Great to see you here! I can help with Frequently Asked Questions such as:`
      },
    
    },
    {
    	"type": "section",
    	"text": {
	     "type": "mrkdwn",
	     "text": "• Course Difficulty \n • What order to take core classes \n • Where to book Office Hours 
       \n • Weekly hours spent on homework"
	  }
      },  
    ]
  });
});
```
#### The user can now begin asking questions. Messages are initiated with a keyword.

![Sample Conversation](https://user-images.githubusercontent.com/59180022/72228303-78a7de80-3573-11ea-9039-955399624aa4.jpg)

```
//When someone asks how long they can expect to spend on homework
//This will be updated with a REGEX to include additional terms like 'time', etc.
//FAQ responds with average weekly time spent based on student feedback

app.message('week', ({ say}) => say('Well, it depends on your experience level, but the average seems to be 15-20 hours a week.'));

//When someone asks what order to take core classes
//FAQbot responds with student consensus

app.message('order', ({ say }) => say('Your fellow classmates believe the best path for students who work is to take 591/592 together, 
            593 alone, 594/596 together and 595 alone.'));

//When someone asks about course difficulty
//FAQbot responds with student opinions

app.message('hard', ({ say }) => say('Many students say 593 and 595 are the most difficult core classes.'));

//When someone asks how to book office hours
//This will be changed to a REGEX to include multiple key words like 'book', etc.
//FAQBot responds with the link to booking site

app.message('office', ({ say }) => say('Office hours can be scheduled via www.youcanbook.me.'));

//When someone says "Thank you" or "Thanks"
//FAQBot responds with say(string) to end conversation

app.message('thank', ({ say}) => say("You're welcome, have a good day!"));

//Just a little levity
//When a robot hears badger used in a sentence
//FAQBot responds wittily 

app.message('badger', ({ say }) => say('Badgers? BADGERS? WE DON’T NEED NO STINKIN BADGERS'));
```





