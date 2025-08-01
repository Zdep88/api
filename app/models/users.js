import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelizeConnect.js';

class User extends Model { }

User.init(
    {
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps: false,
    },
);

export default User;