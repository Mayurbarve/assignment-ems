import mongoose, { Schema } from "mongoose"


const adminSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,

    },
    role: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true

    },
    profileImage: {
        type: String,
        required: true
    }


}, { timestamps: true })


const Admin = mongoose.model('Admin', adminSchema)

export default Admin
