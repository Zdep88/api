import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelizeConnect.js';

class Link extends Model { }

Link.init(
    {
        order: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Link',
        tableName: 'link',
        timestamps: false,
    },
);

export default Link;