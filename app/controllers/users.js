import errorHandler from "../errorHandler.js";
import { User } from "../sequelizeRelations.js";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const usersController = {
    async index(req, res) {
        const users = await User.findAll();
        res.status(200).json(users);
    },

    async signUp(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            errorHandler.throwError(400, 'Email and password are required');
        }
        const gemini = await User.findOne({ where: { email } });
        if (gemini) {
            errorHandler.throwError(409, `User with email ${email} already exists`);
        }
        const hash = await argon2.hash(password);
        const user = await User.create({ email, hash });
        res.status(201).json({ id: user.id, email: user.email });
    },

    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            errorHandler.throwError(400, 'Email and password are required');
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            errorHandler.throwError(404, `User with email ${email} not found`);
        }
        const isPasswordValid = await argon2.verify(user.hash, password);
        if (!isPasswordValid) {
            errorHandler.throwError(401, 'Invalid password');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    },
};

export default usersController;