enum ErrorMessage {
    // general
    ID_DOES_NOT_EXIST = "Id does not exist",
    UNAUTHORIZED_ACCESS = "unauthorized access",
    // user
    USERNAME_PASSWORD_MANDATORY = "username and password are mandatory",
    USERNAME_PASSWORD_INCORRECT = "username or password incorrect",
    // formPage
    FORM_NAME_FORM_DATA_MANDATORY = "formName and formData are mandatory",
    DUPLICATE_FORM_ID = "duplicate id",
    FORM_ID_RESPONSE = "formId and response are mandatory"
}

export default ErrorMessage;
