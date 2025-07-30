const httpErrorDictionnary = {
    400: 'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
    409: 'Conflict',
    418: 'I\'m a teapot',
    500: 'Internal Server Error',
}

const errorHandler = {
    throwError(status, message = "") {
        const error = new Error(message);
        error.status = status;
        throw error;
    },

    notFound(req, res, next) {
        throwError(404);
    },

    internalServerError(err, req, res, next) {
        if (!err.status) {
            console.error('An unexpected error occurred:', err);
            err.status = 500;
        }
        if (!err.message || err.status === 500) {
            err.message = httpErrorDictionnary[err.status] || 'An unexpected error occurred';
        }
        res.status(err.status).json({
            statusCode: err.status,
            message: err.message,
        });
    }
}

export default errorHandler;