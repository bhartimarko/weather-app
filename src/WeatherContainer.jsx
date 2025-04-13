import { useEffect, useState } from 'react';

import sun from './weatherImages/sun.png';
import rain from './weatherImages/rainy.jpeg';
import snow from './weatherImages/snow.jpeg';
import cloudThunder from './weatherImages/cloudy+thunder.png';
import cloudy from './weatherImages/cloudy.png';


function WeatherContainer() {

    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("Mumbai");
    const [bgImage, setBgImage] = useState(sun); //default background.

    //Function to fetch weather data.
    useEffect(() => {
      const fetchWeather = async () => {
        const apiKey = "73109850589f48f127c71ba09e60cd8f"; //from the openWeatherApi.
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try{
          const response = await fetch(url);
          const data = await response.json();

          console.log("Fetched weather data:", data);

          if (data.cod === 200) {
             setWeather(data);             
             upDateBackground(data.weather[0].main);
           } 
           else {
             alert("City not found!");
             setWeather(null);
           }
        }
        catch(error){
          console.error("Error fetching weather data", error);          
        }
      };

      fetchWeather();
    }, [city]);

    useEffect(() => {
      if (weather && weather.weather && weather.weather.length > 0) {
        upDateBackground(weather.weather[0].main);
      }
    }, [weather]);
    

    //function joki update krega background ko based on weather type.
    const upDateBackground = (weatherType) => {
      const type = weatherType.toLowerCase();

      if(type === "clear"){
        setBgImage(sun);
      }
      else if(type === "rain"){
        setBgImage(rain);
      }
      else if(type === "snow"){
        setBgImage(snow);
      }
      else if(type === "clouds"){
        setBgImage(cloudy);
      }
      else if(type === 'thunderstorm'){
        setBgImage(cloudThunder);
      }
      else{
          setBgImage(sun); //fallback    
        } 
    };

    //handle city or search input
    const handleSearch = (e) => {
      e.preventDefault();
      const inputCity = e.target.city.value;
      setCity(inputCity);
    };

    //jsx file
    return (
      <>
          <div className="weatherContainer">

            {/* input or search area  */} 
            <div className="input-search">
            {/* form jaise ek input area bnayenge taki jb ham input de to form jaise submit hoke data base me jaye */}
            <form onSubmit={handleSearch}>
               <input type="text" placeholder="Search City" name='city' className='input-txt'/>
               <button type='submit'> <i className="ri-search-line"></i></button>
            </form>
            </div>
          
             
             {/* ternary operator : (condition ? value_if_true : value_if_false) */}
             {/* React mein agar tum JSX ke andar ternary operator use kar rahi ho, toh JSX content ke andar comment directly mat likho ya phir comment ko curly braces ke andar alag line mein rakho. */}
             {/* wrna ye error dega */}
             {/* If the weather variable is truthy (i.e., it contains data), then render the content inside the parentheses. */}
             {/* If weather is null or undefined (meaning the data hasn't been fetched yet or there's an error), then React will render the alternative (if provided), which is often something like a loading spinner or a fallback message */}
           
             
         {weather  && weather.main ? (

           <div className="weather-images">
            {/* container for background images or degree celcius  */}

             {/* date or time or city name k liye */}
             <div className="dateTime"> {new Date(). toLocaleString()}</div>
             <div className="cityName"> {weather.name}</div>


               <div className="weather-img">
                <img src={bgImage}
                 alt="weather" className='w-img'/>
               </div>

               <div className="temprature">
                   <p>{weather.main.temp}°C</p>
                  {/* <p> 32<sup><sup><i class="ri-circle-line" style={{ fontSize:"8px"}}></i></sup><span style={{fontSize: "16px"}}>C</span></sup></p> */}
                </div>                
          

             <div className="wind-humidity">
                    
                    <div className="wind">
                    <i className="ri-windy-line"></i> 
                    <span className='text'>{weather.wind.speed} km/h</span>
                    </div>
 
                    <div className="humidity">
                    <i className="ri-water-percent-line"></i>
                    <span  className='text'>{weather.main.humidity}%</span>
                    </div>                    
              </div>
            </div> 
             ) : (
              <p>Loading...</p>
             )}
          </div>
          </>
    );
}

export default WeatherContainer;