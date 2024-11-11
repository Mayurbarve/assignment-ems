import { useState } from "react";
import axios from "axios";


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState("hidden")


    const loginHandler = async (e) => {
        e.preventDefault()
        const credentials = {
            email,
            password
        }
        try {
            const comingData = await axios.post("http://localhost:7777/api/v1/login-admin", credentials, {
                withCredentials: true
            })
            if (comingData) {
                localStorage.clear()
                localStorage.setItem('accessToken', comingData.data.data.accessToken)
                window.location.reload()
            }
        } catch (error) {
            console.log("Error Status Code:", error.response.status)
            if (error.response.status) {
                alert("Invalid login details")
                setShow("")
                setTimeout(() => {
                    setShow("hidden")
                }, 2000)
            }
        }
        setEmail('')
        setPassword('')
    }


    return (
        <div className={`flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-100 from-50% `}>
            <div className={`border shadow p-6 w-80 bg-white`}>
                <h2 className={`text-2xl font-bold mb-4`}>Login</h2>
                <form onSubmit={loginHandler}>

                <div className={`mb-4`}>
                        <div className={`mb-4`}>
                            <label className={`black text-gray-700`} htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={`w-full px-3 py-2 border`} placeholder='Enter Your Email' autoComplete="email"
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                                required
                            />
                        </div>
                        <div>
                            <label className={`black text-gray-700`} htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className={`w-full px-3 py-2 border`} placeholder='Enter your Password' autoComplete="current-password"
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                                required
                            />
                        </div>
                    </div>
                    <button className={`w-full bg-teal-300 text-white py-2`} onSubmit={(e) => {loginHandler(e) }}>Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login