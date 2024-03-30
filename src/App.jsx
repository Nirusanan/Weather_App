import { useState } from 'react';
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
  const [icon, setIcon] = useState(cloudIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('Colombo');
  const [lat, setLat] = useState(12221);
  const [long, setLong] = useState(34231);
  const [country, setCountry] = useState('SL');
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type='text'
            className='cityInput'
            placeholder='search-city' />
          <div className='search-icon'>
            <img src={searchIcon} alt='Search' />
          </div>
        </div>

        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long={long} humidity={humidity} wind={wind}/>
        
        <p className='copyright'>
          Designed By <span>Niru</span>
        </p>

      </div>
    </>
  );
}

export default App;
