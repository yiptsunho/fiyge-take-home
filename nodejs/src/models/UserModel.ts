import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize"
import sequelize from "../databases/mysql"

export interface UserInterface extends Model<InferAttributes<UserInterface>, InferCreationAttributes<UserInterface>> {
    id: CreationOptional<number>;
    username: string;
    password: string;
    displayName: string;
    roleId: CreationOptional<number>;
    createdAt: CreationOptional<string>;
    updatedAt: CreationOptional<string>;
}

const User = sequelize.define<UserInterface>("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    displayName: {
        type: DataTypes.STRING
    },
    roleId: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: "user",
    underscored: true
})

export default User;
