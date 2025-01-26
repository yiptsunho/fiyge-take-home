import express from "express";
import userService from "../services/UserService";
import {StatusCodes} from "http-status-codes";
import requireAuthentication from "../middlewares/RequireAuthentication";

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
        const result = await userService.register(req.body)
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
})

export default router;
