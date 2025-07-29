import { Link } from "../sequelizeRelations.js";

const linksController = {
    async index(req, res) {
        const links = await Link.findAll();
        res.status(200).json({
            statusCode: 200,
            message: 'Links retrieved successfully',
            data: links,
        });
    },

    async show(req, res) {
        const { id } = req.params;
        const link = await Link.findByPk(id);
        if (link) {
            res.status(200).json({
                statusCode: 200,
                message: 'Link retrieved successfully',
                data: link,
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'Link not found',
            });
        }
    },

    async create(req, res) {
        const { order, name, url } = req.body;
        try {
            const link = await Link.create({ order, name, url });
            res.status(201).json({
                statusCode: 201,
                message: 'Link created successfully',
                data: link,
            });
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: 'Error creating link',
                error: error.message,
            });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { order, name, url } = req.body;
        try {
            const link = await Link.findByPk(id);
            if (link) {
                link.order = order;
                link.name = name;
                link.url = url;
                await link.save();
                res.status(200).json({
                    statusCode: 200,
                    message: 'Link updated successfully',
                    data: link,
                });
            } else {
                res.status(404).json({
                    statusCode: 404,
                    message: 'Link not found',
                });
            }
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: 'Error updating link',
                error: error.message,
            });
        }
    }
};

export default linksController;