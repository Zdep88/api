import { Router } from "express";
import indexController from "./controllers/index.js";
import linksController from "./controllers/links.js";

const router = Router();

router.get('/', indexController.index);

router.get('/links', linksController.index);
router.get('/links/:id', linksController.show);
router.post('/links', linksController.create);
router.put('/links/:id', linksController.update);

export default router;