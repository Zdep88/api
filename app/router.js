import { Router } from "express";
import indexController from "./controllers/index.js";
import usersController from "./controllers/users.js";
import linksController from "./controllers/links.js";
import mathsController from "./controllers/maths.js";

const router = Router();

router.get('/', indexController.index);
router.get('/error', indexController.error);

router.post('/signup', usersController.signUp);
router.post('/login', usersController.login);

router.use('/links', usersController.auth, usersController.admin);
router.get('/links', linksController.index);
router.post('/links', linksController.create);
router.get('/links/:id', linksController.read);
router.patch('/links/:id', linksController.update);
router.delete('/links/:id', linksController.delete);

router.get('/maths', mathsController.documentation);
router.get('/maths/homothety', mathsController.homothety);
// get Roman numeral !!!

export default router;