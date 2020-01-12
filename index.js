const { App } = require('@slack/bolt');
const store = require('./store');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});


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
				"text": "• Course Difficulty \n • What order to take core classes \n • Where to book Office Hours \n • Weekly hours spent on homework"
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
				"text": "• Course Difficulty \n • What order to take core classes \n • Where to book Office Hours \n • Weekly hours spent on homework"
			}
		},  
    ]
  });
});

//When someone asks how long they can expect to spend on homework
//This will be updated with a REGEX to include additional terms like 'time', etc.
//FAQ responds with average weekly time spent based on student feedback

app.message('week', ({ say}) => say('Well, it depends on your experience level, but the average seems to be 15-20 hours a week.'));


//When someone asks what order to take core classes
//FAQbot responds with student consensus

app.message('order', ({ say }) => say('Your fellow classmates believe the best path for students who work is to take 591/592 together, 593 alone, 594/596 together and 595 alone.'));


//When someone asks about course difficulty
//FAQbot responds with student opinions

app.message('hard', ({ say }) => say('Many students say 595 and 595 are the most difficult core classes.'));


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




            
