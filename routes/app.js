const express = require('express');
const app = express();
const tweet = require('./my-config');
const bodyParser = require('body-parser');

const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false}));

//	This line tells the express to use the provided CSS, Image files.
app.use('/static', express.static('public'));

// This tells express to use Pug:
app.set('view engine', 'pug');

let timeline = [];
let friends = [];
let dm = [];

	// TODO:  use async.parallel() ???
	//	https://caolan.github.io/async/docs.html#parallel
	//		OR callbacks-async?

// GET statuses/user_timeline
tweet.get('statuses/user_timeline', { count: 5, exclude_replies: true })
	.catch(function (err) {
		console.log('caught errror', err.message);
	})
	.then(function (result) {
	/*		let userName = data[0].user.name;
	let screen_name = data[0].user.screen_name;
	let friends_count = data[0].user.friends_count;
	let user_prof_img = data[0].user.profile_image_url;
	let created_at = data[0].user.created_at;
	let text = data[0].text;
	let retweet_count = data[0].retweeted_status.retweet_count;	// Retweet
	let fav_count = data[0].retweeted_status.favorite_count;	// Like
	*/
		timeline = result.data;
	});

// GET friends/ids
tweet.get('friends/list', { screen_name: '@apalm112', count: 5 })
	.catch(function (err) {
		console.log('caught errror', err.message);
	})
	.then(function (result) {
	/*		let name = data.users[1].name;
	let screen_name  = data.users[1].screen_name;
	let profile_image_url = data.users[1].profile_image_url;
	*/
		friends = result.data.users;
		console.log(friends[0].profile_image_url);
	});

// GET direct_messages
tweet.get('direct_messages', { count: 5 })
	.catch(function (err) {
		console.log('caught errror', err.message);
	})
	.then(function (result) {
	/*	let profile_image_url = data[0].sender.profile_image_url;
	let text = data[0].text;
	let sender_time = data[0].sender.created_at;
	*/
		dm = result.data;
	});

app.use('/', (req, res, next) => {
	res.render('index', {
		timeline: timeline,
		friends: friends,
		dm: dm
	});
	next();
});

app.listen(port, () => {
	console.log(`The application is running on localhost:${port}`);
});

//	TODO The template
// It should also include your personal Twitter name and profile image at the top of the screen.
// Styling is not the important part of this project. Craft your template markup to take advantage of the CSS we’ve provided you. Knowing how to work with someone else’s styles is a very important skill as a full-stack developer. Pay attention to class names, inheritance, and so on. Try to avoid element types that are not used in the provided HTML and CSS files.*/

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
