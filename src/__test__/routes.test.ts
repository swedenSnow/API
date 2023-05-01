import app from '../server';
import supertest from 'supertest';


describe('GET /', () => {
	it('should send back some data and status 200', async () => {
	  const res = await supertest(app).get('/');
  
	  expect(res.status).toBe(200);
	  expect(res.body).toBeDefined();
	  expect(res.body.message).toBe('hello!');
	});
  });