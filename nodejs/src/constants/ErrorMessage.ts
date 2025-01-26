enum ErrorMessage {
    // general
    ID_DOES_NOT_EXIST = "Id does not exist",
    UNAUTHORIZED_ACCESS = "unauthorized access",
    // user
    USERNAME_PASSWORD_MANDATORY = "username and password are mandatory",
    USERNAME_PASSWORD_INCORRECT = "username or password incorrect",
    // form
    FORM_NAME_FORM_DATA_MANDATORY = "formName and formData are mandatory",
    DUPLICATE_FORM_ID = "duplicate id",
}

export default ErrorMessage;
