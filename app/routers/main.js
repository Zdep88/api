import { Router } from "express";
import indexController from "../controllers/index.js";
import usersController from "../controllers/users.js";
import LinksRouter from "./links.js";

const mainRouter = Router();

mainRouter.get('/', indexController.index);
mainRouter.get('/error', indexController.error);

mainRouter.get('/signup', usersController.signUp);
mainRouter.get('/login', usersController.login);

mainRouter.use('/links', usersController.auth, usersController.admin, LinksRouter);

export default mainRouter;