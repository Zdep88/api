import { sequelize } from "./app/sequelizeRelations.js";
import { Link, User } from "./app/sequelizeRelations.js";

await sequelize.sync({ force: true })

await Link.bulkCreate([
    { order: 1, name: 'Croupier', url: "https://croupier.zdep.fr" },
    { order: 2, name: 'Epavix', url: "https://epavix.zdep.fr" },
    { order: 3, name: 'API', url: "https://api.zdep.fr" }
]);

await User.bulkCreate([
    { email: "ilpo@gmail.com", hash: "$argon2id$v=19$m=65536,t=3,p=4$VEmsBMC0sUNzuLvCrFeznA$TyrVJ1gngK/37bsQX037D0x6X4asKZClHcM65XWWPd4" },
]);