import formModel from "../models/FormModel";
import {FormDTO} from "../dto/FormDTO";
import AppErr from "../errors/AppErr";
import {StatusCodes} from "http-status-codes";
import ErrorCode from "../constants/ErrorCode";
import ErrorMessage from "../constants/ErrorMessage";
import type { JwtPayload } from "jsonwebtoken"
import {decodeJWT} from "../utils/Util";
import Role from "../constants/Role";
import userModel from "../models/UserModel";
import formResponseModel from "../models/FormResponseModel";
import {FormResponseDTO} from "../dto/FormResponseDTO";

interface CreateFormBodyInterface {
    id?: number;
    formName: string;
    formData: string;
}

interface UpdateFormBodyInterface {
    formName: string;
    formData: string;
}

interface SubmitFormResponseBodyInterface {
    formId: number;
    userId: number | null;
    response: string;
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

        // 1. if formPage id does not exist, return error
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

        // 2. if user is not admin, return error
        const decodedToken: string | JwtPayload = decodeJWT(cookies.token)
        const isNotAdmin = typeof decodedToken !== "string" && decodedToken.roleId != Role.ADMIN
        if (isNotAdmin) {
            throw new AppErr(ErrorCode.UNAUTHORIZED_ACCESS, ErrorMessage.UNAUTHORIZED_ACCESS, StatusCodes.FORBIDDEN)
        }

        // 3. create formPage
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

        // 4. update formName, formData and updatedAt, then save
        form.formName = formName
        form.formData = formData
        form.updatedAt = Date.toString()
        delete form.createdAt
        const updatedForm = await form.save()

        return new FormDTO(updatedForm)
    },

    submitFormResponse: async (body) => {
        const { formId, userId, response } = body

        // 1. if formId or response is not provided, return error. Assuming end user maybe not be our system user, so userId is optional
        if (!formId || !response) {
            throw new AppErr(ErrorCode.GENERAL_INCORRECT_PARAM, ErrorMessage.FORM_ID_RESPONSE, StatusCodes.BAD_REQUEST)
        }

        // 2. if form id does not exist, return error
        const form = await formModel.findByPk(formId)
        if (form == null) {
            throw new AppErr(ErrorCode.ID_DOES_NOT_EXIST, ErrorMessage.ID_DOES_NOT_EXIST, StatusCodes.BAD_REQUEST)
        }

        // 3. if user id is provided but does not exist, return error
        if (userId !== null && userId !== undefined) {
            const user = await userModel.findByPk(userId)
            if (user == null) {
                throw new AppErr(ErrorCode.ID_DOES_NOT_EXIST, ErrorMessage.ID_DOES_NOT_EXIST, StatusCodes.BAD_REQUEST)
            }
        }

        // 4. save response in db
        const formResponse = await formResponseModel.create({formId, userId, response})
        return new FormResponseDTO(formResponse);
    }
}

export default FormService;
