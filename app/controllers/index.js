const indexController = {
    index(req, res) {
        res.status(200).json({
            statusCode: 200,
            message: 'Welcome to the API',
        });
    }
};

export default indexController;