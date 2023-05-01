import prisma from '../db';
import { comparePassword, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!password) {
            // The password is missing or empty
            res.status(400).json({ message: 'Password cannot be empty' });
            return;
        }
        const user = await prisma.user.create({
            data: {
                username,
                password: await hashPassword(password),
            },
        });

        const token = createJWT(user);
        res.json({ token });
    } catch (e) {
        console.error(e);
        if (e.code === 'P2002' && e.meta.target.includes('username')) {
            // The username is already taken
            res.status(400).json({ message: 'Username already taken' });
        } else {
            console.error(e);
            e.type = 'input';
        }
        next(e);
    }
};

export const signin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        
        // const isValid = await comparePassword(password, user.password)
        const isValid = user?.password && await comparePassword(password, user.password);
        
        if (!isValid) {
            res.status(401);
            res.json({ message: 'Nope!' });
        }
        
        const token = createJWT(user);
        res.json({ token });
    } catch (e) {
        console.error(e);
        e.type = 'input';
        next(e);
    }
};
