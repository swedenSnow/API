import express from 'express';
import router from './router';
import morgan from 'morgan';

const app = express();

const customLogger = (message) => (req, res, next) => {
	console.log(`Hello from ${message}`);
	next();
}

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customLogger('custom logger'));

// app.use((req, res, next) => {
// 	res.status(401)
// 	res.send('Nope!')

// })

app.get('/', (req, res) => {
console.log('helllo from express');
	res.status(200)
  	res.send('Hello World!');
});

app.use('/api', router);

export default app;