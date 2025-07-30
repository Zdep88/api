import { Router } from "express";
import indexController from "./controllers/index.js";
import usersController from "./controllers/users.js";
import linksController from "./controllers/links.js";

const router = Router();

router.get('/', indexController.index);
router.get('/error', indexController.error);

router.get('/users', usersController.index);
router.post('/users', usersController.create);
router.get('/users/:id', usersController.read);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

router.get('/links', linksController.index);
router.post('/links', linksController.create);
router.get('/links/:id', linksController.read);
router.put('/links/:id', linksController.update);
router.delete('/links/:id', linksController.delete);

export default router;