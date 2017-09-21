const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false}));

//	This line tells the express to use the provided CSS, Image files.
app.use('/static', express.static('public'));

// This tells express to use Pug:
app.set('view engine', 'pug');

const twitRoutes = require('./twitter.js');

app.use(twitRoutes);

app.listen(port, () => {
	console.log(`The application is running on localhost:${port}`);
});
