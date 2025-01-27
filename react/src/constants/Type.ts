export interface CommonResponseType<T = any> {
    errorCode?: string
    data?: T | null
    message?: string
}

export type FormDataType = {
    id?: number;
    formName: string;
    formData: string;
    createdAt?: string;
    updatedAt?: string;
}

export enum InputComponentType {
    TEXT_INPUT = "TEXT_INPUT",
    TEXTAREA = "TEXTAREA",
    SELECT_DROPDOWN = "SELECT_DROPDOWN",
    CHECKBOX = "CHECKBOX",
    RADIO_BUTTON = "RADIO_BUTTON",
    DATE_PICKER = "DATE_PICKER",
    FILE_UPLOAD = "FILE_UPLOAD"
}

export interface BaseComponentInterface {
    id?: number | null;
    label: string | null;
    required: boolean;
}

export interface TextInputComponentInterface extends BaseComponentInterface {
    type: InputComponentType.TEXT_INPUT;
    valuePlaceholder?: string | null;
    value: string | null;
    minLength: number | null;
    maxLength: number | null;
    regex: string | null;
}

export interface TextAreaComponentInterface extends Omit<TextInputComponentInterface, "type">{
    type: InputComponentType.TEXTAREA;
    rows: number;
}

export interface SelectDropdownComponentInterface extends BaseComponentInterface {
    type: InputComponentType.SELECT_DROPDOWN;
    valuePlaceholder?: number | null;
    options: OptionInterface[]
    value: string | null;
}

export interface CheckboxComponentInterface extends BaseComponentInterface {
    type: InputComponentType.CHECKBOX;
    options: OptionInterface[]
    value: string | null;
}

export interface RadioButtonComponentInterface extends BaseComponentInterface {
    type: InputComponentType.RADIO_BUTTON;
    options: OptionInterface[];
    value: string | null;
}

export interface DatePickerComponentInterface extends BaseComponentInterface {
    type: InputComponentType.DATE_PICKER;
    value: string | null;
}

export interface FileUploadComponentInterface extends BaseComponentInterface {
    type: InputComponentType.FILE_UPLOAD;
    value: string | null;
}

export type GenericInputComponentType = TextInputComponentInterface | TextAreaComponentInterface | SelectDropdownComponentInterface | CheckboxComponentInterface | RadioButtonComponentInterface | DatePickerComponentInterface | FileUploadComponentInterface

export interface SaveFormRequestType {
    formName: string;
    formData: string;
}
export interface UpdateFormRequestType extends SaveFormRequestType {
    id: number;
}

export interface OptionInterface {
    id: string;
    isNew?: boolean;
    value: number;
    label: string;
}
