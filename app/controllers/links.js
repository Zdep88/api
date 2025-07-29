import { Link } from "../sequelizeRelations.js";

const linksController = {
    async index(req, res) {
        const links = await Link.findAll();
        res.status(200).json({
            statusCode: 200,
            message: 'Links retrieved successfully',
            data: links,
        });
    }
};

export default linksController;