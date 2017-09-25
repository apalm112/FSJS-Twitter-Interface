const Twit = require('twit');

const tweet = new Twit(
	{
		consumer_key:	'',
		consumer_secret:	 '',
		access_token:	'',
		access_token_secret:	''
	}
);

module.exports = tweet;
