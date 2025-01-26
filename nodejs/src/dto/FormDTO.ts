import {FormInterface} from "../models/FormModel";

export class FormDTO {
    id: number;
    formName: string;
    formData: string;
    createdAt: string;
    updatedAt: string;

    constructor(form: FormInterface) {
        this.id = form.id;
        this.formName = form.formName;
        this.formData = form.formData;
        this.createdAt = form.createdAt;
        this.updatedAt = form.updatedAt;
    }
}
