import {FormResponseInterface} from "../models/FormResponseModel";

export class FormResponseDTO {
    id: number;
    formId: number;
    userId: number;
    response: string;
    createdAt: string;
    updatedAt: string;

    constructor(formResponse: FormResponseInterface) {
        this.id = formResponse.id;
        this.formId = formResponse.formId;
        this.userId = formResponse.userId;
        this.response = formResponse.response;
        this.createdAt = formResponse.createdAt;
        this.updatedAt = formResponse.updatedAt;
    }
}
