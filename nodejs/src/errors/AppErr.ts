class AppErr extends Error {
    errorCode: number;
    statusCode: number;
    constructor(errorCode, message, statusCode) {
        super(message);
        this.errorCode = errorCode
        this.statusCode = statusCode
    }
}

export default AppErr;
