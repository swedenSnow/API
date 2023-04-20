import express from 'express';

const app = express();

app.get('/', (req, res) => {
console.log('helllo from express');
	res.status(200)
  	res.send('Hello World!');
});

export default app;