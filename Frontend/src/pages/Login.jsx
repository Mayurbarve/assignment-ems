import React, {useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [error, setError] = useState(null);
    const {login} = useAuth();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", { email, password })
            
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin"){
                    navigate('/admin-dashboard')
                } //else nav
            }
            
        } catch (error) { 
            if(error.response && !error.response.data.success){
                alert("Invalid login details")
            }
            
        }
    }

    return (
        <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-100 from-50% '>
            <div className='border shadow p-6 w-80 bg-white'>
                <h2 className='text-2xl font-bold mb-4'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <div className='mb-4'>
                            <label className='black text-gray-700' htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className='w-full px-3 py-2 border'
                                placeholder='Enter Your Email'
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className='black text-gray-700' htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className='w-full px-3 py-2 border'
                                placeholder='Enter your Password'
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button className='w-full bg-teal-300 text-white py-2'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
