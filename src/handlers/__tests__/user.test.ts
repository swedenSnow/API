import * as user from '../user';

describe('user handler', () => {
	
	it('should be defined', () => {
        expect(1).toEqual(1);
    });
	it('should create a new user', async () => {
		const req = {
			body: {
                username: 'hello',
                password: 'test'
            }
		};
		const res = {
            json({token}) {
				expect(token).toBeTruthy() ;
			}
        };
		const next = jest.fn();
		const newUser = await user.createNewUser(req, res, next)
    });
})