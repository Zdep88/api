import 'dotenv/config';
import argon2 from 'argon2';
import { sequelize, User, Link } from "./app/sequelizeRelations.js";

const firstAdminEmail = process.env.FIRST_ADMIN_EMAIL;
const firstAdminPassword = process.env.FIRST_ADMIN_PASSWORD;
const hash = await argon2.hash(firstAdminPassword);

await sequelize.sync({ force: true });

await User.create({
    email: firstAdminEmail,
    hash,
    admin: true
});

await User.create({
    email: 'ilpo@gmail.com',
    hash: await argon2.hash('ilpo')
});

await Link.bulkCreate([
    { order: 1, name: 'Croupier', url: "https://croupier.zdep.fr" },
    { order: 2, name: 'Epavix', url: "https://epavix.zdep.fr" },
    { order: 3, name: 'API', url: "https://api.zdep.fr" },

    { name: 'IONOS', url: "https://my.ionos.fr/account/products" },
    { name: 'GitHub', url: "https://github.com/Zdep88" },
    { name: 'devDesk', url: "https://github.com/Zdep88/devDesk" }
]);