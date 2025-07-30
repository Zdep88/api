import errorHandler from "../errorHandler.js";

const indexController = {
    index(req, res) {
        res.status(200).json({
            statusCode: 200,
            message: 'Welcome to the API',
        });
    },

    error(req, res) {
        errorHandler.throwError(418);
    }
};

export default indexController;