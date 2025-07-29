import { Router } from "express";
import indexController from "./controllers/index.js";
import linksController from "./controllers/links.js";

const router = Router();

router.get('/', indexController.index);

router.get('/links', linksController.index);

export default router;