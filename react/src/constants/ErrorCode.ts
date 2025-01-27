enum ErrorCode {
    // general
    ID_DOES_NOT_EXIST = 101,
    GENERAL_INCORRECT_PARAM = 102,
    UNAUTHORIZED_ACCESS = 105,
    // user
    DUPLICATE_USERNAME = 103,
    USERNAME_OR_PASSWORD_INCORRECT = 104,
    // formPage
}

export default ErrorCode;
