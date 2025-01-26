import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        define: {
            underscored: true
        }
    }
);

export default sequelize;
