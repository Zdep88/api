const errorHandler = {

    notFound(req, res, next) {
        res.status(404).json({
            statusCode: res.statusCode,
            message: 'Not Found',
        });
    },

    internalServerError(err, req, res, next) {
        console.error(err);
        res.status(500).json({
            statusCode: res.statusCode,
            message: 'Internal Server Error',
        });
    }
}

export default errorHandler;