import { ApiError } from "../middlewares/apiError.js"
import { asyncHandler } from "./asyncHandler.js"
import jwt from "jsonwebtoken"
import Admin from "../admin/admin.model.js"

const verifyJWT = asyncHandler(async(req, _, next) => {

    try {

        const token = req.cookies?.accessToken


        if (!token) {
            throw new ApiError(401, "Unauthorized")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        if (!decodedToken) {
            throw new ApiError(401, "Unauthorized or accesstoken expired")
        }
        req.admin = await Admin.findById(decodedToken._id)
        
        next()


    } catch (error) {

        throw new ApiError(401, error?.message || "Invalid Access Token")
    }

})

export default verifyJWT