import { Router } from "express";
import linksController from "../controllers/links.js";

const LinksRouter = Router();

LinksRouter.get('/', linksController.index);
LinksRouter.post('/', linksController.create);
LinksRouter.get('/:id', linksController.read);
LinksRouter.patch('/:id', linksController.update);
LinksRouter.delete('/:id', linksController.delete);

export default LinksRouter;