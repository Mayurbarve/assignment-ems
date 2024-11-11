import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeForm from "./CreateEmployee.jsx";
import EditEmployee from "./EditEmployee.jsx";

const Dashboard = () => {


    const [employeeData, setEmployeeData] = useState([]);
    const [toggle, setToggle] = useState("")
    const [secondToggle, setSecondToggle] = useState("hidden")
    const [thirdToggle, setThirdToggle] = useState("hidden")
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    const deleteEmployee = async (id) => {
        try {
            const comingData = await axios.delete(`http://localhost:7777/api/v1/delete-employee/${id}`, {
                withCredentials: true
            })
            window.location.reload()
            console.log(comingData)

        } catch (error) {
            // if(error.response.status === 401){
            //     localStorage.clear()
            // }
            console.log("Error Status Code:", error.response.status)

        }

    }

    const getData = async () => {
        try {
            const comingData = await axios.get("http://localhost:7777/api/v1/get-employees", {
                withCredentials: true
            })

            if (comingData) {

                console.log(comingData.data.employees)
                setEmployeeData(comingData.data.employees)
            }
        } catch (error) {
            // if(error.response.status === 401){
            //     localStorage.clear()
            // }
            console.log("Error Status Code:", error.response.status)

        }
    }

    useEffect(() => {
        getData()
    }, [])




    return (
        <>
            <div className={` ${thirdToggle} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}>

                <button
                    onClick={() => {

                        setToggle("");
                        setThirdToggle("hidden");
                        window.location.reload()

                    }}
                    className={` cursor-pointer w-fit h-fit bg-red-300 py-1 px-3 text-red-900 font-bold  rounded`}>X
                </button>
                <EditEmployee dataProps={selectedEmployee} />
            </div>
            <div className={` ${secondToggle} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}>

                <button
                    onClick={() => {

                        setToggle("");
                        setSecondToggle("hidden");
                        window.location.reload()

                    }}
                    className={` cursor-pointer w-fit h-fit bg-red-300 py-1 px-3 text-red-900 font-bold  rounded`}>X
                </button>
                <EmployeeForm />
            </div>

            <div className={` px-5 py-4 bg-white rounded-md  ${toggle}`}>
                <div className={`flex flex-row items-center justify-between`}>
                    <h1 className={`text-xl font-medium text-gray-700`}>
                        Dashboard
                    </h1>
                    <button
                        onClick={() => {
                            setToggle("hidden");
                            setSecondToggle("");
                        }}

                        className={`py-1 px-2 bg-transparent border-2 font-semibold text-lg border-gray-700 text-gray-700 rounded `}>
                        create emplooye +
                    </button>
                </div>
                <hr className={`mt-3 mb-3`} />


                <div className="text-gray-700 font-medium overflow-y-auto">
                    {/* Header Row */}
                    <div className="grid grid-cols-9 gap-4 items-center border-b pb-2">
                        <h3>Unique Id</h3>
                        <h3>Image</h3>
                        <h3>Name</h3>
                        <h3>Email</h3>
                        <h3>Phone</h3>
                        <h3>Designation</h3>
                        <h3>Gender</h3>
                        <h3>Created At</h3>
                        <h3>Action</h3>
                    </div>

                    {/* Data Row */}

                    <div className="mt-2   overflow-y-auto flex flex-col gap-4">
                        {employeeData.map((item, index) => (
                            <div key={index} className="grid grid-cols-9 gap-4 items-center ">
                                <h4 className={`overflow-x-hidden`}>{item._id}</h4>
                                <img src={item.profileImage || ""} alt="broken profileImage" className="w-10 h-10 object-cover rounded-full" />
                                <h4 className={`overflow-x-hidden`}>{item.name}</h4>
                                <h4 className={`overflow-x-hidden`}>{item.email}</h4>
                                <h4 className={`overflow-x-hidden`}>{item.phone}</h4>
                                <h4 className={`overflow-x-hidden`}>{item.designation}</h4>
                                <h4 className={`overflow-x-hidden`}>{item.gender}</h4>
                                <h4 className={`overflow-x-hidden`}>{item.createdAt.split("T")[0]}</h4>
                                <div className="flex flex-row gap-10">
                                    <button onClick={() => {
                                        setToggle("hidden");
                                        setThirdToggle("");
                                        setSelectedEmployee(item)
                                    }} className="text-blue-500">edit</button>
                                    <button onClick={deleteEmployee.bind(this, item._id)} className="text-red-500">delete</button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </>
    )
}

export default Dashboard