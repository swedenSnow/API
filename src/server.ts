import express from 'express';
import router from './router';

const app = express();

app.get('/', (req, res) => {
console.log('helllo from express');
	res.status(200)
  	res.send('Hello World!');
});

app.use('/api', router);

export default app;