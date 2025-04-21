import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import cloud from "../images/Clouds.png";
import rain from "../images/Rain.png";
import clear from "../images/Clear.png";
import mist from "../images/mist.png";
import err from "../images/error.png";
export default function Weather () {
  let [search,setSearch]=useState("");  // For the input box useState Handle
  let [data,setData]=useState();   // For the display data of specific city or country  useState Handle
  let [error,setError]=useState()   // // For the error handle
  const API_KEY="599e32be91857dedbe84f27a44b3934b";
  //const API="https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
  // Handle Input Functionality
  const handleInput=(e)=>{
      setSearch(e.target.value);
      console.log(e.target.value);
  }
  const myFun=async()=>{
    const get=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
    const jsonData=await get.json();
    console.log(jsonData);
    setData(jsonData);
    if(search == "")
    {
      setError("Please Enter Name !");
    }
   else if(jsonData.cod == '404')
    {
         setError("Please Enter Valid Name !");
    }
    else{
      setError("");
    }
    setSearch("");
  }
  return (
    <>
    <div className='container'>
        <div className='inputs'>
          <input  placeholder='Enter city,Country' value={search}  onChange={handleInput} />
          <button onClick={myFun}><SearchIcon /></button>
        </div>
        <div>
          {
            error ?
            <div className='errorPage'>
              <p>{error}</p>
              <img  src={err}/>
            </div> : ""
          }
         {
           data && data.weather ?
           <div className='weathers'>
             <h2 className='cityName'>{data.name}</h2>
             <img src={data.weather[0].main ==="Clouds" ? cloud :"" } />
             <img src={data.weather[0].main ==="Rain" ? rain: "" } />
             <img src={data.weather[0].main ==="Clear" ? clear: "" } />
             <img src={data.weather[0].main ==="Mist" ? mist: "" } />
             <img src={data.weather[0].main ==="Haze" ? cloud: "" } />
             <h2 className='temprature'>{Math.trunc(data.main.temp)}°C</h2>
             <p className='climate'>{data.weather[0].description}</p>
           </div> : ""
         }
        </div>

    </div>
    </>
  )
}
