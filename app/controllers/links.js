import { Link } from "../sequelizeRelations.js";

const linksController = {
    async index(req, res) {
        const links = await Link.findAll();
        res.status(200).json(links);
    },

    async create(req, res) {
        const { order, name, url } = req.body;
        const link = await Link.create({ order, name, url });
        res.status(201).json(link);
    },

    async read(req, res) {
        const { id } = req.params;
        const link = await Link.findByPk(id);
        res.status(200).json(link);
    },

    async update(req, res) {
        const { id } = req.params;
        const { order, name, url } = req.body;
        const link = await Link.findByPk(id);
        link.order = order;
        link.name = name;
        link.url = url;
        await link.save();
        res.status(200).json(link);
    },

    async delete(req, res) {
        const { id } = req.params;
        const link = await Link.findByPk(id);
        await link.destroy();
        res.status(200).json({
            statusCode: 200,
            message: 'Link deleted successfully',
        });
    },
};

export default linksController;