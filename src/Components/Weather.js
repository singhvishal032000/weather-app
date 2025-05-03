
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import cloud from "../images/Clouds.png";
import rain from "../images/Rain.png";
import clear from "../images/Clear.png";
import mist from "../images/mist.png";
import err from "../images/error.png";

export default function Weather() {
  let [search, setSearch] = useState(""); // For the input box useState Handle
  let [data, setData] = useState(); // For the display data of specific city or country useState Handle
  let [error, setError] = useState(""); // For the error handle
  
  const API_KEY = process.env.REACT_APP_API_KEY; // Get API Key from the environment

  // Handle Input Functionality
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const myFun = async () => {
    if (search === "") {
      setError("Please Enter Name !");
      return;
    }

    try {
      // Fetch data from OpenWeather API
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
      
      // Check if the response is OK
      if (!response.ok) {
        throw new Error("City not found or API error");
      }
      
      // Parse the JSON response
      const jsonData = await response.json();
      console.log(jsonData);
      
      if (jsonData.cod === '404') {
        setError("Please Enter Valid Name !");
        setData(null); // Reset data in case of an invalid city
      } else {
        setError(""); // Clear any previous errors
        setData(jsonData); // Set the fetched data
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
      setData(null); // Reset data on error
    }

    // Reset the search field after the request
    setSearch("");
  };

  // Determine which weather image to show based on the condition
  const getWeatherImage = (weather) => {
    switch (weather) {
      case "Clouds":
        return cloud;
      case "Rain":
        return rain;
      case "Clear":
        return clear;
      case "Mist":
        return mist;
      default:
        return cloud; // Default to cloud if no match
    }
  };

  return (
    <div className="container">
      <div className="inputs">
        <input 
          placeholder="Enter city, Country" 
          value={search} 
          onChange={handleInput} 
        />
        <button onClick={myFun}>
          <SearchIcon />
        </button>
      </div>
      
      <div>
        {/* Error Message Handling */}
        {error && (
          <div className="errorPage">
            <p>{error}</p>
            <img src={err} alt="Error" />
          </div>
        )}
        
        {/* Weather Data Display */}
        {data && data.weather && (
          <div className="weathers">
            <h2 className="cityName">{data.name}</h2>
            <img src={getWeatherImage(data.weather[0].main)} alt={data.weather[0].main} />
            <h2 className="temprature">{Math.trunc(data.main.temp)}°C</h2>
            <p className="climate">{data.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
