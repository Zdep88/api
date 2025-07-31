import errorHandler from "../errorHandler.js";
import { User } from "../sequelizeRelations.js";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const usersController = {
    async signUp(req, res) {
        if (!req.body) {
            errorHandler.throwError(400, 'Request body is required');
        }
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
        res.status(201).json({  email: user.email });
    },

    async login(req, res) {
        if (!req.body) {
            errorHandler.throwError(400, 'Request body is required');
        }
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
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    },

    auth(req, res, next) {
        if (!req.headers.authorization) {
            errorHandler.throwError(401, 'Authorization header is required');
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            errorHandler.throwError(401, 'Bearer token is required');
        }
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            errorHandler.throwError(401, 'Invalid or expired token');
        }
        next();
    },

    async admin(req, res, next) {
        const user = await User.findByPk(req.user.id);
        if (!user || !user.admin) {
            errorHandler.throwError(403, 'Admin access is required for this route');
        }
        next();
    }
}

export default usersController;