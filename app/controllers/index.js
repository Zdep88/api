import errorHandler from "../errorHandler.js";
import { exec } from "child_process";

const indexController = {
    index(req, res) {
        res.status(200).json({
            statusCode: 200,
            message: 'Welcome to the API',
        });
    },

    error(req, res) {
        errorHandler.throwError(418);
    },

    alive(req, res) {
        const scriptPath = process.env.ALIVE_SCRIPT_PATH;
        exec(`sh ${scriptPath}alive.sh`, (error, stdout, stderr) => {
            console.log('stdout:', error, stdout, stderr);
            return res.status(418).json({
                statusCode: 418,
                message: "I'm a teapot",
                messageBis: (error ? "KO : échec de la mise à jour" : "OK : Mise à jour réussie, des bisous"),
                scriptPath,
                error,
                stdout,
                stderr
            });
        });
    }
};

export default indexController;