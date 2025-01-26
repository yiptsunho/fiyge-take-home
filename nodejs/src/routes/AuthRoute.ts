import express from "express"
import authService from "../services/AuthService";
import {StatusCodes} from "http-status-codes";

const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        const token = await authService.login(req.body)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000000
        })

        res.status(StatusCodes.OK).send()
    } catch (err) {
        next(err)
    }
})

export default router;
