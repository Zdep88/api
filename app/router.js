import { Router } from "express";
import indexController from "./controllers/index.js";
import linksController from "./controllers/links.js";

const router = Router();

router.get('/', indexController.index);

router.get('/links', linksController.index);
router.post('/links', linksController.create);
router.get('/links/:id', linksController.read);
router.put('/links/:id', linksController.update);
router.delete('/links/:id', linksController.delete);

export default router;