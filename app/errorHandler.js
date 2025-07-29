const errorHandler = {

    notFound(req, res, next) {
        res.status(404).json({
            statusCode: 404,
            message: 'Not Found',
        });
    },

    internalServerError(err, req, res, next) {
        console.error(err);
        res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error',
        });
    }
}

export default errorHandler;