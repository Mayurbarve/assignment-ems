import { uploadOnCloudinary } from "../cloudinary/cloudinary.js"
import { ApiError } from "../middlewares/apiError.js"
import { asyncHandler } from "../middlewares/asyncHandler.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Employee from "../employee/employee.model.js"
import Admin from "./admin.model.js"
import { response } from "express"


const getEmployees = asyncHandler(async (_, res) => {

    const employees = await Employee.find()
    console.log(employees)

    if (!employees) {
        throw new ApiError(404, "employees not found")
    }


    res.status(200).json({
        success: true,
        employees
    })
})

const deleteEmployee = asyncHandler(async (req, res) => {

    const { _id } = req.params

    if (!_id) {
        throw new ApiError(404, "id not found")
    }

    const response = await Employee.findByIdAndDelete(_id)

    if (!response) {
        throw new ApiError(500, "something went wrong during deleting employee")
    }


    res.status(200)
        .json({
            status: "success",
            message: "employee deleted successfully",
            data: response
        })


    })



    const registerAdmin = asyncHandler(async (req, res) => {

        const { email, password, role, phone, designation, gender } = req.body

        if ([email, password, role, phone, gender].some((field) => {

            return field?.trim() === ""
        })) {

            throw new ApiError(400, "Please fill all the fields(username, email, password, role, phone, gender)")
        }

        const admin = await Admin.findOne({ email })



        if (admin) {
            throw new ApiError(400, "admin or email already exists")
        }

        const profileImageLocalPath = req.file.path

        if (!profileImageLocalPath) {
            throw new ApiError(400, "Profile image is required")
        }


        const profileImage = await uploadOnCloudinary(profileImageLocalPath)

        if (!profileImage) {
            throw new ApiError(400, "image is not found in local storage")
        }
        console.log(profileImage)

        const hashedPassword = await bcrypt.hash(password, 10)

        console.log(hashedPassword, "this is hashed password")

        const adminData = await Admin.create({
            email,
            password: hashedPassword,
            role,
            phone,
            designation,
            gender,
            profileImage: profileImage.url
        })

        console.log(adminData)




        res.status(201)
            .json(
                {
                    status: "success",
                    message: "Admin registered successfully",
                    data: "adminData"
                }
            )
    }
    )

    const loginAdmin = asyncHandler(async (req, res) => {

        const { email, password } = req.body

        const admin = await Admin.findOne({ email })


        if (!admin) {
            throw new ApiError(404, "admin not found")
        }

        const legit = bcrypt.compare(password, admin.password)


        if (!legit) {
            throw new ApiError(400, "incorrect password while login")
        }


        const accessToken = generateAccessToken(admin._id)


        const data = {
            email: admin.email,
            accessToken: accessToken

        }

        const options = {
            httpOnly: true,
            secure: true
        }



        res.status(200)
            .cookie("accessToken", accessToken, options)
            .json({
                "status": 200,
                "message": "login successfull",
                data
            })
    })


    const generateAccessToken = (_id) => {

        const accessToken = jwt.sign(
            {
                _id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        );

        return accessToken


    }


    const createEmployee = asyncHandler(async (req, res) => {

        const { name, email, role, designation, phone, gender } = req.body

        if ([name, email, role, phone, designation, gender].some((field) => {

            return field?.trim() === ""
        })) {

            throw new ApiError(400, "Please fill all the fields(username, email, password, role, phone, gender)")
        }

        console.log("just checking for debugging purpose1")
        const employee = await Employee.findOne({ email })



        if (employee) {
            throw new ApiError(400, "employee or email already exists")
        }
        console.log("just checking for debugging purpose 2")

        const profileImageLocalPath = req.file.path
        console.log("just checking for debugging purpose 3")

        if (!profileImageLocalPath) {
            throw new ApiError(400, "Profile image is required")
        }


        console.log("just checking for debugging purpose 4")

        const profileImage = await uploadOnCloudinary(profileImageLocalPath)

        if (!profileImage) {
            throw new ApiError(400, "image is not found in local storage")
        }
        console.log(profileImage)


        console.log("just checking for debugging purpose 5")

        const employeeData = await Employee.create({
            name,
            email,
            role,
            phone,
            designation,
            gender,
            profileImage: profileImage.url
        })

        console.log("just checking for debugging purpose 6")

        console.log(employeeData)




        res.status(201)
            .json(
                {
                    status: "success",
                    message: "Employee created successfully",
                    data: employeeData
                }
            )
    })


    const logoutAdmin = asyncHandler(async (req, res) => {


        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .json({
                status: 200,
                message: "logout successfull"
            })


    })



    const editEmployee = asyncHandler(async (req, res) => {
        const { name, email, role, designation, phone, gender } = req.body;
    
        if (!name && !email && !role && !designation && !phone && !gender) {
            throw new ApiError(400, "At least one field is required");
        }
    
        const employee = await Employee.findById(req.params._id);
        if (!employee) {
            throw new ApiError(404, "Employee not found");
        }
    
        const updatedFields = {};
        if (name && name !== employee.name) updatedFields.name = name;
        if (email && email !== employee.email) updatedFields.email = email;
        if (role && role !== employee.role) updatedFields.role = role;
        if (designation && designation !== employee.designation) updatedFields.designation = designation;
        if (phone && phone !== employee.phone) updatedFields.phone = phone;
        if (gender && gender !== employee.gender) updatedFields.gender = gender;
    
        if (Object.keys(updatedFields).length === 0) {
            return res.status(200).json({
                status: "success",
                message: "No changes detected",
                data: employee,
            });
        }
    
        const response = await Employee.findByIdAndUpdate(req.params._id, updatedFields, { new: true });
    
        res.status(200).json({
            status: "success",
            message: "Employee updated successfully",
            data: response,
        });
    });
    

    export { getEmployees, registerAdmin, loginAdmin, createEmployee, logoutAdmin, deleteEmployee, editEmployee }

