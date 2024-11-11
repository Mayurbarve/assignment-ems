
import mongoose, { Schema } from "mongoose"

const employeeSchema  = new Schema(
{
   
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    role:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true

    },
    phone:{
        type: Number,
        required: true
    },
    profileImage: {
        type: String,
        required: false
    }

}, {timestamps: true})


const Employee = mongoose.model('Employee', employeeSchema)
export default Employee