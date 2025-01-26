const requestInterceptor = function (req, res, next) {
    console.log("Time: ", Date.now())
    next()
}

export default requestInterceptor;
