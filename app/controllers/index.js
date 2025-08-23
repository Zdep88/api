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
            return res.status(error ? 500 : 200).json({
                statut: (error ? "KO" : "OK"),
                information: (error ? "Echec de la mise à jour." : "Mise à jour réussie !"),
                warning: "Ce système de mise à jour automatique ne doit pas être utilisé si le fichier .env a été modifié !",
                explication: "Ce système utilise git pour mettre à jour l'appli, et le fichier .env a été volontairement enlevé de git. Le serveur ne peut donc pas 'deviner' les modifications à apporter à ce fichier. Et pourquoi le fichier .env a été enlevé de git ? Parce qu'il contient des informations potentiellement sensibles genre mot de passe de base de données."

            });
        });
    }
};

export default indexController;