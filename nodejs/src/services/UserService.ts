import AppErr from "../errors/AppErr";
import {StatusCodes} from "http-status-codes";
import userModel from "../models/UserModel";
import ErrorCode from "../constants/ErrorCode";
import bcrypt from "bcrypt"
import {UserDTO} from "../dto/UserDTO";

interface RegisterBodyInterface {
    username: string | undefined;
    password: string | undefined;
    displayName: string | undefined;
}

const UserService = {
    register: async (body: RegisterBodyInterface) => {
        const {username, password, displayName} = body

        // 1. if username, password or displayName is not provided, return error
        if (!username || !password || !displayName) {
            throw new AppErr(ErrorCode.GENERAL_INCORRECT_PARAM, "username, password and displayName are mandatory", StatusCodes.BAD_REQUEST)
        }

        // 2. if duplicate username, return error
        const existingUser = await userModel.findOne({ where: { username } })
        const duplicateUsername = existingUser !== null
        if (duplicateUsername) {
            throw new AppErr(ErrorCode.DUPLICATE_USERNAME, "duplicate username", StatusCodes.BAD_REQUEST)
        }

        // 3. hash password and create user
        const hash = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            username,
            displayName,
            password: hash
        })

        return new UserDTO(user)
    }
}

export default UserService;

