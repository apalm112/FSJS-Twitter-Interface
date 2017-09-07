const express = require('express');
const router = express.Router();
const tweet = require('./my-config');

// GET statuses/user_timeline
tweet.get('statuses/user_timeline', { count: 14, exclude_replies: true }, (err, data, res) => {
	console.log('TIMELINE:');
	console.log(data[0].user.name);
	let screen_name = data[0].user.screen_name;
	let user_prof_img = data[0].user.profile_image_url;
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

router.get('/', (req, res) => {
	res.render('app');
});

module.exports = router;
