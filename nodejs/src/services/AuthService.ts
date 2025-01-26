import AppErr from "../errors/AppErr";
import {StatusCodes} from "http-status-codes";
import userModel from "../models/UserModel";
import ErrorCode from "../constants/ErrorCode";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import ErrorMessage from "../constants/ErrorMessage";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

interface LoginBodyInterface {
    username: string | undefined;
    password: string | undefined;
}

const AuthService = {
    login: async (body: LoginBodyInterface) => {
        const {username, password} = body

        // 1. if username or password is not provided, return error
        if (!username || !password) {
            throw new AppErr(ErrorCode.GENERAL_INCORRECT_PARAM, ErrorMessage.USERNAME_PASSWORD_MANDATORY, StatusCodes.BAD_REQUEST)
        }

        // 2. if username does not exist in db, return error
        const result = await userModel.findOne({ where : { username } })
        if (result === null) {
            throw new AppErr(ErrorCode.USERNAME_OR_PASSWORD_INCORRECT, ErrorMessage.USERNAME_PASSWORD_INCORRECT, StatusCodes.BAD_REQUEST)
        }
        const { dataValues: user } = result

        // 3. if password incorrect, return error
        const passwordCorrect = await bcrypt.compare(password, user.password)
        if (!passwordCorrect) {
            throw new AppErr(ErrorCode.USERNAME_OR_PASSWORD_INCORRECT, ErrorMessage.USERNAME_PASSWORD_INCORRECT, StatusCodes.BAD_REQUEST)
        }

        // 4. delete password in object before signing
        delete user.password
        // 5. calculate token expiry time
        const expiresInSecond = Number(process.env.ACCESS_TOKEN_EXPIRE_IN_HOUR) * 60 * 60

        // 6. sign token with user info and token
        return jwt.sign(user, process.env.MY_SECRET, { expiresIn: expiresInSecond })
    }
}

export default AuthService;
