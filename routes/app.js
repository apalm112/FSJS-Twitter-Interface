const express = require('express');
const Twit = require('twit');
const bodyParser = require('body-parser');
const tweet = require('./my-config');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false}));

//	This line tells the express to use the provided HTML, CSS, Image files.
app.use('/static', express.static('public'));

// This tells express to use Pug:
app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
	res.render('heading');
	next();
});

app.use((err, req, res, next) => {
	res.locals.error = err;
	res.status(err.status);
	res.render('error');
});

// GET statuses/user_timeline
tweet.get('statuses/user_timeline', { count: 14, exclude_replies: true }, (err, data, res) => {
	console.log('TIMELINE:');
	console.log(data[0].user.name);
	console.log(data[0].user.screen_name);
	console.log(data[0].user.profile_image_url);
	console.log(data[0].user.created_at);
	console.log(data[0].text);
	console.log(data[0].retweeted_status.retweet_count);	// Retweet
	console.log(data[0].retweeted_status.favorite_count);	// Like
});
	// GET friends/ids
tweet.get('friends/list', { screen_name: '@apalm112', count: 5 }, (err, data, res) => {
	console.log('FOLLOWING:');
	console.log(data.users[2].name);
	console.log(data.users[2].screen_name);
	console.log(data.users[2].profile_image_url);
});

// GET direct_messages
tweet.get('direct_messages', { count: 2 }, (err, data, res) => {
	console.log('DM:');
console.log(data[0].sender.name);
console.log(data[0].sender.profile_image_url);
	console.log(data[0].text);
	console.log(data[0].sender.created_at);
});

app.listen(port, () => {
	console.log(`The application is running on localhost:${port}`);
});









//	Study the Twitter REST API docs to find which methods will provide the information you need to fill out the templates, based on the sample layout. The docs are linked in the project resources.

//	TODO The template should have spaces for:
/*your 5 most recent tweets
your 5 most recent friends
your 5 most recent private messages

It should also include your personal Twitter name and profile image at the top of the screen.
Styling is not the important part of this project. Craft your template markup to take advantage of the CSS we’ve provided you. Knowing how to work with someone else’s styles is a very important skill as a full-stack developer. Pay attention to class names, inheritance, and so on. Try to avoid element types that are not used in the provided HTML and CSS files.*/

//	TODO:	Using Node and Express, request the data you need from Twitter’s API, render it in your template, and send it to the client at the “/” route.
// GET account/verifiy_credentials


/*	TODO:
Each rendered result must include all of the information seen in the sample layout:
*tweets -message content -# of retweets -# of likes -date tweeted
*friends -profile image -real name -screenname
*messages -message body -date the message was sent -time the message was sent
Note that you don’t have to display direct messages as a back and forth conversation. You only need to display the last 5 messages that were received, or the last 5 messages that were sent.*/

/*	TODO: Push Goals:
Add a section to the bottom of your page that allows a user to post a new tweet. The new tweet should display without having to refresh the page.
Add an error page to your application, so that if anything goes wrong with your routes, the user will see a friendly message rendered, instead of the default error code.
Include your personal background image from Twitter as a background for the page header.

*/
