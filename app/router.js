import { Router } from "express";
import indexController from "./controllers/index.js";
import usersController from "./controllers/users.js";
import linksController from "./controllers/links.js";

const router = Router();

router.get('/', indexController.index);
router.get('/error', indexController.error);

router.get('/signup', usersController.signUp);
router.get('/login', usersController.login);

router.use('/links', usersController.auth, usersController.admin);
router.get('/links', linksController.index);
router.post('/links', linksController.create);
router.get('/links/:id', linksController.read);
router.patch('/links/:id', linksController.update);
router.delete('/links/:id', linksController.delete);

export default router;