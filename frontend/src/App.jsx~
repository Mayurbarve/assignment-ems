import './App.css';
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { useState, useEffect } from "react";

function App() {
    const [isTokenAvailable, setIsTokenAvailable] = useState(false);

    useEffect(() => {
        const checkToken = () => {
            const tokenExists = localStorage.getItem('accessToken');
            setIsTokenAvailable(!!tokenExists);
        };

        checkToken();

        window.addEventListener('storage', checkToken);


        return () => {
            window.removeEventListener('storage', checkToken);
        };
    }, []);

    return (
        <div className="bg-gray-700 h-screen w-screen">
            {isTokenAvailable ? (
                <>
                    <Header />
                    <Dashboard />
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default App;
