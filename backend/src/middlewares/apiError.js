import { error } from "console";
import { stat } from "fs";

class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong in api errors response go to where you used ApiError object",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


export {ApiError}