import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize"
import sequelize from "../databases/mysql"

export interface FormInterface extends Model<InferAttributes<FormInterface>, InferCreationAttributes<FormInterface>> {
    id: CreationOptional<number>;
    formName: string;
    formData: string;
    createdAt: CreationOptional<string>;
    updatedAt: CreationOptional<string>;
}

const Form = sequelize.define<FormInterface>("Form", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    formName: {
        type: DataTypes.STRING
    },
    formData: {
        type: DataTypes.JSON
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: "form",
    underscored: true
})

export default Form;
