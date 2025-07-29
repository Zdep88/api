import { sequelize } from "./app/sequelizeRelations.js";
import { Link } from "./app/sequelizeRelations.js";

await sequelize.sync({ force: true })

await Link.bulkCreate([
    { order: 1, name: 'Croupier', url: "https://croupier.zdep.fr" },
    { order: 2, name: 'Epavix', url: "https://epavix.zdep.fr" },
    { order: 3, name: 'API', url: "https://api.zdep.fr" }
]);