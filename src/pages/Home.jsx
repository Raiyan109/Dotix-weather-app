import { useState } from "react";

import axios from 'axios';
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [finalValue, setFinalValue] = useState('')
    const [weatherData, setWeatherData] = useState([])

    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '19f2e4533322e495ca80880592baef6b'




    const fetchData = async () => {
        await axios.get(`${baseUrl}?q=+${inputValue}&appid=${API_KEY}`)
            .then(response => {
                console.log(response.data.main.temp);
                setWeatherData(response.data)
            })
            .catch((err) => {
                console.log(err)
                // alert('Please Enter a valid location')
                toast.error("Please Enter a valid location")
            })

    }

    useEffect(() => {
        fetchData()
    }, [finalValue])




    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        setFinalValue(inputValue)
    }


    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
            <h1 className="text-[#ffd52d] p-12 text-3xl text-center">Enter Location (City or ZIP code)</h1>
            <div className="box">
                <form
                    onSubmit={handleClick}
                    className="flex flex-col justify-center items-center gap-10">

                    {/* <label >Search</label> */}
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">

                        </span>
                        <input
                            value={inputValue}
                            onChange={handleChange}
                            type="search" name="Search" placeholder="Search..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-orange-600" />
                    </div>

                    <button
                        type="submit" className="bg-[#ffd52d] text-[#19161c] py-3 px-2 font-semibold rounded-md">Get Weather</button>
                </form>


            </div>


            <div>
                <div className="flex justify-center items-center pt-9 text-6xl">
                    <h1>{weatherData && weatherData?.main?.temp}&#x2103;</h1>
                </div>
                <div className="flex justify-center items-center py-9 text-6xl">
                    <h1>{weatherData && weatherData?.name}</h1>
                </div>

                <div className="flex justify-between items-center border-2 m-16 py-12 px-8">
                    <div className="">
                        <h1 className="text-xl font-semibold">Humidity</h1>
                        <h3><h1>{weatherData && weatherData.main?.humidity}%</h1></h3>
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold">Wind Speed</h1>
                        <h4>{weatherData && weatherData.wind?.speed}km/h</h4>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Home;