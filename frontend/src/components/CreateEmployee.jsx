import { useState } from "react";
import axios from "axios";

const EmployeeForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("employee");
    const [designation, setDesignation] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    // Handle the profile image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };

    // Handle the form submission
    const handleCreate = async (e) => {
        e.preventDefault();

        // Prepare employee data
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("role", role);
        formData.append("designation", designation);
        formData.append("gender", gender);
        formData.append("phone", phone);


        // Append the profile image to form data if available
        if (profileImage) {
            formData.append("profileImage", profileImage);
        }

        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });
        try {
            const response = await axios.post(
                "http://localhost:7777/api/v1/create-employee",
                formData,
                {
                    withCredentials: true
                }

            );
            console.log(response.data); // Handle the response as needed
            alert("Employee created successfully");

            // Reset form fields after successful submission
            setName("");
            setEmail("");
            setDesignation("");
            setPhone("");
            setGender("");
            setProfileImage(null);
        } catch (error) {
            console.error("Error creating employee:", error);
        }
    };

    return (
        <div className="flex flex-col gap-10 justify-center items-center py-3">
            <form onSubmit={handleCreate}>
                <div className="px-5 py-6 bg-white flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        {/* Name Input */}
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="px-2 py-1 rounded border border-slate-300 outline-1 outline-blue-400"
                            type="text"
                            placeholder="Employee Name"
                            required
                        />

                        {/* Email Input */}
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-2 py-1 rounded border border-slate-300 outline-1 outline-blue-400"
                            type="email"
                            placeholder="Email"
                            required
                        />

                        {/* Role Radio Buttons */}
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="employee"
                                    checked={role === "employee"}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="mr-2"
                                    required
                                />
                                Employee
                            </label>

                        </div>

                        {/* Designation Select */}
                        <select
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className="px-2 py-1 rounded border border-slate-300 outline-1 outline-blue-400"
                            required
                        >
                            <option value="">Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="manager">Manager</option>
                            <option value="sales">Sales</option>
                        </select>

                        {/* Phone Input */}
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="px-2 py-1 rounded border border-slate-300 outline-1 outline-blue-400"
                            type="tel"
                            placeholder="Phone"
                            required
                            pattern="^[0-9]{10}$"
                            maxLength="10"
                        />

                        {/* Gender Select */}
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="px-2 py-1 rounded border border-slate-300 outline-1 outline-blue-400"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>

                        {/* Profile Image Upload */}
                        <div>
                            <label>Profile Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-teal-800 text-white px-5 py-1 rounded-full"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
