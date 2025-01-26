import jwt from "jsonwebtoken"
import {StatusCodes} from "http-status-codes";

/**
 * A middleware to restrict access of endpoint to authenticated users only
 * @param req original request class
 * @param res original response class
 * @param next whatever next action is
 */
const requireAuthentication = (req, res, next) => {
    const token = req.cookies.token

    try {
        const user = jwt.verify(token, process.env.MY_SECRET)
        req.user = user
        next()
    } catch (err) {
        console.error(err)
        res.status(StatusCodes.UNAUTHORIZED).clearCookie("token").send()
    }
}

export default requireAuthentication;
