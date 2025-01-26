import formModel from "../models/FormModel";
import {FormDTO} from "../dto/FormDTO";
import AppErr from "../errors/AppErr";
import {StatusCodes} from "http-status-codes";
import ErrorCode from "../constants/ErrorCode";
import ErrorMessage from "../constants/ErrorMessage";
import type { JwtPayload } from "jsonwebtoken"
import {decodeJWT} from "../utils/Util";
import Role from "../constants/Role";
import {UserInterface} from "../models/UserModel";

interface CreateFormBodyInterface {
    id?: number;
    formName: string;
    formData: string;
}

interface UpdateFormBodyInterface {
    formName: string;
    formData: string;
}

const FormService = {
    getAllForms: async () => {
        // 1. retrieve all forms
        const formList = await formModel.findAll()

        return formList.map(form => {
            return new FormDTO(form)
        })
    },

    getForm: async (_id: string) => {
        const id = Number(_id)
        // 1. if form id does not exist, return error
        const form = await formModel.findByPk(id)
        if (form === null) {
            throw new AppErr(ErrorCode.ID_DOES_NOT_EXIST, "ID does not exist", StatusCodes.BAD_REQUEST)
        }

        return new FormDTO(form)
    },

    createForm: async (body: CreateFormBodyInterface, cookies: { token: string }) => {
        const {formName, formData} = body

        // 1. if formName or formData is not provided, return error
        if (!formName || !formData) {
            throw new AppErr(ErrorCode.GENERAL_INCORRECT_PARAM, ErrorMessage.FORM_NAME_FORM_DATA_MANDATORY, StatusCodes.BAD_REQUEST)
        }

        // 3. if user is not admin, return error
        const decodedToken: string | JwtPayload = decodeJWT(cookies.token)
        const isNotAdmin = typeof decodedToken !== "string" && decodedToken.roleId != Role.ADMIN
        if (isNotAdmin) {
            throw new AppErr(ErrorCode.UNAUTHORIZED_ACCESS, ErrorMessage.UNAUTHORIZED_ACCESS, StatusCodes.FORBIDDEN)
        }

        // 4. create form
        const form = await formModel.create({formName, formData})

        return new FormDTO(form)
    },

    updateForm: async (id: string, body: UpdateFormBodyInterface, cookies: { token: string }) => {
        const {formName, formData} = body

        // 1. if id, formName or formData is not provided, return error
        if (!id || !formName || !formData) {
            throw new AppErr(ErrorCode.GENERAL_INCORRECT_PARAM, ErrorMessage.FORM_NAME_FORM_DATA_MANDATORY, StatusCodes.BAD_REQUEST)
        }

        // 2. if form id does not exist, return error
        const form = await formModel.findByPk(id)
        if (form == null) {
            throw new AppErr(ErrorCode.ID_DOES_NOT_EXIST, ErrorMessage.ID_DOES_NOT_EXIST, StatusCodes.BAD_REQUEST)
        }

        // 3. if user is not admin, return error
        const decodedToken: string | JwtPayload = decodeJWT(cookies.token)
        const isNotAdmin = typeof decodedToken !== "string" && decodedToken.roleId != Role.ADMIN
        if (isNotAdmin) {
            throw new AppErr(ErrorCode.UNAUTHORIZED_ACCESS, ErrorMessage.UNAUTHORIZED_ACCESS, StatusCodes.FORBIDDEN)
        }

        // 4. update formName and formData, then save
        form.formName = formName
        form.formData = formData
        form.updatedAt = Date.toString()
        delete form.createdAt
        const updatedForm = await form.save()

        return new FormDTO(updatedForm)
    }
}

export default FormService;
