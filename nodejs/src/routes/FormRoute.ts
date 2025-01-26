import express from "express"
import formService from "../services/FormService";
import {StatusCodes} from "http-status-codes";

const router = express.Router()

router.get("/list", async (req, res) => {
    const result = await formService.getAllForms()
    res.status(StatusCodes.OK).json({
        data: result
    })
})

router.get("/:id", async (req, res, next) => {
    try {
        const result = await formService.getForm(req.params.id)
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
})

router.post("/save", async (req, res, next) => {
    try {
        const result = await formService.createForm(req.body, req.cookies)
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
})

router.put("/update/:id", async (req, res, next) => {
    try {
        const result = await formService.updateForm(req.params.id, req.body, req.cookies)
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
})

export default router;
