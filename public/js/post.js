// POST.JS
document.addEventListener('DOMContentLoaded', () => {
	const tweetInput = document.querySelector('#tweet-textarea');
	console.log('TEST HELLO WORLD');
	tweetInput.addEventListener('keydown', function(e) {
		// e.preventDefault();
		const tweetText = document.getElementById('tweet-textarea');
		sessionStorage.setItem('tweet', tweetInput.value);
		let sessionTweet = sessionStorage.setItem('tweet', tweetInput.value);
		console.log(sessionTweet);
	});
});

/*	TODO: Push Goals:
Add a section to the bottom of your page that allows a user to post a new tweet. The new tweet should display without having to refresh the page. */
*******************************************************************






// const stream = tweet.stream('user', { user: 'apalm112'});
// stream.on('tweet', function(tweet) {
// 	console.log(tweet);
// });


/*app.post('/', (req, res) => {
	const getTweet = sessionStorage.getItem('tweet');
	console.log('POST Route');
	if (getTweet) {
		tweet.post('statuses/update', { status: getTweet }, function(err, data, res) {
			console.log(getTweet);
			console.log('DATA: ', data);
			console.log('RESPONSE: ', res);
		});
	}
});*/

// app.post('/', (req, res) => {
// 	res.cookie('tweetText', req.body.)
// });


/*	TODO: Push Goals:
Add a section to the bottom of your page that allows a user to post a new tweet. The new tweet should display without having to refresh the page. */

/* TODO: Add an error page to your application, so that if anything goes wrong with your routes, the user will see a friendly message rendered, instead of the default error code.
*/



FROM SLACK PROJECT 7 CHANNEL:
nhampton Posts:
	Using a post request without sockets could cause a refresh delay, thus the desire to use websockets. A large part of the  organization problem in this project has to do with getting used to Express as a framework, and that takes a bit of trial/error and practice

	8/7/17		I would recommend:

	- Using the <form> element to make a POST request to the server with the tweet
	- Catching that POST request with an express route and inside that route, using Twit to make a POST request to Twitter with the tweet.
	- Use Twit to listen to the Twitter streaming API endpoint for the user timeline
	- This is where socket.io comes in. When Twit gets an update on the streaming timeline endpoint, use socket.io to send the timeline update to the client (browser)
	- On the client (browser) side, you’ll need a javascript file to listen to the socket.io instance on the server with a socket.io client instance on the browser (looks like an event listener when you get it set up) and append the new tweet on the top of the timeline using DOM manipulation

	So, like I said, not really that simple. Kinda like setting up another half-server/client on the side. Thus the exceeds. (edited)
