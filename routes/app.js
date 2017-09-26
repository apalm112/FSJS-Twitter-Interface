const express = require('express');
const app = express();
const tweet = require('./config');
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

tweet.get('account/verify_credentials', { skip_status: true })
	.catch(function (err) {
		console.log('caught error', err.message);
	})
	.then(function(result) {
		user_background = result.data;
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
	});

app.use('/', (req, res) => {
	res.render('layout', {
		timeline: timeline,
		friends: friends,
		dm: dm,
		user_background: user_background
	});
});

app.listen(port, () => {
	console.log(`The application is running on localhost:${port}`);
});
