import { useEffect, useState } from 'react';
import './App.css';

/* Images */
import searchIcon from "./assets/search-icon.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind2.png";
import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humidity.png";
import thunderstormIcon from "./assets/thunderstorm.png";
import mistIcon from "./assets/mist.png";

const WeatherDetails = ({ icon, temp, city, country, lat, long, humidity, wind }) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt='Image' />
      </div>
      <div className='temp'>{temp}°C</div>
      <div className='location'>{city}</div>
      <div className='country'>{country}</div>
      <div className='cord'>
        <div>
          <span className='lat'>latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='long'>longitude</span>
          <span>{long}</span>
        </div>
      </div>

      <div className='data-container'>
        <div className='element'>
          <img className='icon' src={humidityIcon} alt='Humidity'/>
          <div className='data'>
            <div className='humidity-percent'>{humidity}%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img className='icon' src={windIcon} alt='wind'/>
          <div className='data'>
            <div className='wind-percent'>{wind} km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>

    </>
  );
};

function App() {
  let api_key = "###";
  const [text, setText] = useState('Colombo');
  const [icon, setIcon] = useState(cloudIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('Colombo');
  const [lat, setLat] = useState(6.9319);
  const [long, setLong] = useState(34231);
  const [country, setCountry] = useState('LK');
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "11d": thunderstormIcon,
    "11n": thunderstormIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50d": mistIcon,
    "50n": mistIcon,
  }


  const search = async () =>{
    setLoading(true);
    let url= `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{
      let res = await fetch(url);
      let data = await res.json();
      // console.log(data);

      if(data.cod === "404"){
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);

    }catch (error){
      console.error("An error occurred:", error.message);
      setError("An error occurred while fetching weather data");
    } finally{
      setLoading(false);
    }
  };

  const handleCity= (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e) =>{
    if(e.key === 'Enter'){
      search();
    }
  };

  useEffect(() =>{
    search();
  }, [])

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type='text'
            className='cityInput'
            placeholder='search-city' 
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}/>
          <div className='search-icon' onClick={()=>search()} >
            <img src={searchIcon} alt='Search' />
          </div>
        </div>
 
        {loading && <div className='load-message'>Loading...</div>}
        {error && <div className='error-message'>{error}</div>}
        {cityNotFound && <div className='cityNotFound'>City not found</div>}

        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long={long} humidity={humidity} wind={wind}/>}


        <p className='copyright'>
          Designed By <span>Niru</span>
        </p>

      </div>
    </>
  );
}

export default App;
