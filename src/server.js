const express = require('express');

const app = express();

app.get('/', (req, res) => {
console.log('helllo from express');
	res.status(200)
	// res.json({message: 'Hello express json'})
  res.send('Hello World!');
});

module.exports = app;