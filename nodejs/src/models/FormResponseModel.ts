import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Optional} from "sequelize"
import sequelize from "../databases/mysql"

export interface FormResponseInterface extends Model<InferAttributes<FormResponseInterface>, InferCreationAttributes<FormResponseInterface>> {
    id: CreationOptional<number>;
    formId: number;
    userId?: number;
    response: string;
    createdAt: CreationOptional<string>;
    updatedAt: CreationOptional<string>;
}

const FormResponse = sequelize.define<FormResponseInterface>("FormResponse", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    formId: {
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER
    },
    response: {
        type: DataTypes.JSON
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: "form_response",
    underscored: true
})

export default FormResponse;
