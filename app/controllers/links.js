import errorHandler from "../errorHandler.js";
import { Link } from "../sequelizeRelations.js";

const linksController = {
    async index(req, res) {
        const links = await Link.findAll();
        res.status(200).json(links);
    },

    async create(req, res) {
        if (!req.body) {
        errorHandler.throwError(400, 'Request body is required');
        }
        const { order, name, url } = req.body;
        if ( !name || !url) {
            errorHandler.throwError(400, 'Name and URL are required');
        }
        if (!Number.isInteger(order) && order !== undefined) {
            errorHandler.throwError(400, 'If specified, order must be an integer');
        }
        const link = await Link.create({ order, name, url });
        res.status(201).json(link);
    },

    async read(req, res) {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            errorHandler.throwError(400, 'ID must be an integer');
        }
        const link = await Link.findByPk(id);
        if (!link) {
            errorHandler.throwError(404, `Link with ID ${id} not found`);
        }
        res.status(200).json(link);
    },

    async update(req, res) {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            errorHandler.throwError(400, 'ID must be an integer');
        }
        const link = await Link.findByPk(id);
        if (!link) {
            errorHandler.throwError(404, `Link with ID ${id} not found`);
        }
        if (!req.body) {
            errorHandler.throwError(400, 'Request body is required');
        }
        const { order, name, url } = req.body;
        if (!name && !url && !order) {
            errorHandler.throwError(400, 'At least one field (name, url, order) must be provided for update');
        }
        if(order) {
            if (!Number.isInteger(order)) {
                errorHandler.throwError(400, 'If specified, order must be an integer');
            }
            link.order = order;
        }
        if (name) {
            link.name = name;
        }
        if (url) {
            link.url = url;
        }            
        await link.save();
        res.status(200).json(link);
    },

    async delete(req, res) {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            errorHandler.throwError(400, 'ID must be an integer');
        }
        const link = await Link.findByPk(id);
        if (!link) {
            errorHandler.throwError(404, `Link with ID ${id} not found`);
        }
        await link.destroy();
        res.status(200).json({
            statusCode: 200,
            message: 'Link deleted successfully',
        });
    },
};

export default linksController;