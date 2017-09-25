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

let user_background = [];
let timeline = [];
let friends = [];
let dm = [];

// TODO: Add User Authentication to get UI to work in browser, i.e.-- so links are clickable to Twitter
tweet.get('account/verify_credentials', { skip_status: true })
	.catch(function (err) {
		console.log('caught error', err.message);
	})
	.then(function(result) {
		user_background = result.data;
		console.log(user_background);
	});


// GET statuses/user_timeline
tweet.get('statuses/user_timeline', { count: 5, exclude_replies: true })
	.catch(function (err) {
		console.log('caught errror', err.message);
	})
	.then(function (result) {
		timeline = result.data;
	});

// GET friends/ids
tweet.get('friends/list', { screen_name: '@apalm112', count: 5 })
	.catch(function (err) {
		console.log('caught errror', err.message);
	})
	.then(function (result) {
		friends = result.data.users;
	});

// GET direct_messages
tweet.get('direct_messages', { count: 5 })
	.catch(function (err) {
		console.log('caught errror', err.message);
	})
	.then(function (result) {
		dm = result.data;
		let sender_time = dm[0].sender.created_at;
	});

app.use('/', (req, res, next) => {
	res.render('layout', {
		timeline: timeline,
		friends: friends,
		dm: dm,
		user_background: user_background
	});
	next();
});

app.listen(port, () => {
	console.log(`The application is running on localhost:${port}`);
});

//	TODO The template
// It should also include your profile image at the top of the screen.

/*	TODO: Push Goals:
Add a section to the bottom of your page that allows a user to post a new tweet. The new tweet should display without having to refresh the page.
Add an error page to your application, so that if anything goes wrong with your routes, the user will see a friendly message rendered, instead of the default error code.
Include your personal background image from Twitter as a background for the page header.
*/
