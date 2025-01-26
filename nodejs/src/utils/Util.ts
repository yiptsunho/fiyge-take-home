import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const decodeJWT = (token: string | null) => {
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
    const secret = process.env.MY_SECRET
    try {
        return jwt.verify(token, secret)
    } catch (err) {
        console.error(err)
        return ""
    }

}

export {
    decodeJWT
}
