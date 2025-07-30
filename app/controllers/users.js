import errorHandler from "../errorHandler.js";
import { User } from "../sequelizeRelations.js";

const usersController = {
    async index(req, res) {
        const users = await User.findAll();
        res.status(200).json(users);
    },

    async create(req, res) {
        errorHandler.throwError(501, 'Not implemented');
    },

    async read(req, res) {
        errorHandler.throwError(501, 'Not implemented');
    },

    async update(req, res) {
        errorHandler.throwError(501, 'Not implemented');
    },

    async delete(req, res) {
        errorHandler.throwError(501, 'Not implemented');
    },
};

export default usersController;