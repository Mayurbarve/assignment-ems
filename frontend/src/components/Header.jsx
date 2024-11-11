import axios from "axios";

const Header = () => {
    const logoutHandler = async () => {

        const comingData = await axios.post("http://localhost:7777/api/v1/logout-admin")
        console.log(comingData)
        localStorage.clear()
        window.location.reload()

    }


    return (
        <>
            <div className={` bg-teal-500 px-5 w-full py-2 justify-center items-center  `}>

                <div className={`flex justify-between items-center flex-row `}>

                    <div className={`flex flex-row text-white gap-28`}>
                        <h2 className={`text-2xl font-bold`}>EMS</h2>
                        <div className={`flex flex-row gap-8 text-lg font-bold text-white`}>
                            <h2>Home</h2>
                            <h2>Employee list</h2>
                        </div>
                    </div>
                    <div className={`flex flex-row gap-8 text-white items-center`}>
                        <button onClick={logoutHandler} className={`py-2 px-4 bg-teal-800 text-white rounded-full`}>logout</button>
                    </div>
                </div>

            </div>
        </>
    )
}


export default Header