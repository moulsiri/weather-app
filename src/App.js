import {useState} from 'react'
import Context from './Context';

import LocationForm from './components/Location';
import WeatherInfo from './components/WeatherInfo';

import './style.css';
const App = () => {
  const [toggle,setToggle]=useState(false);
  const [weatherData,setWeatherData]=useState(null);
  const makeObject=(data,location)=>{
    let tmp={}
    tmp.icon=data.weather[0].icon;
    tmp.temprature=data.main.temp-273.15;
    tmp.description=data.weather[0].description;
    tmp.feels_like=data.main.feels_like-273.15;
    tmp.humidity=data.main.humidity;
    tmp.location=location
    setWeatherData(tmp)
}
  const sideStyle={
    left:toggle?'100%':"0",
  }
  return (
    <Context value={{toggle,setToggle,setWeatherData,weatherData,makeObject}}>
      <div id="app">
      <div id="weatherApp">
      <WeatherInfo/>
      <LocationForm addStyle={sideStyle}/>
      </div>


    </div>
    </Context>
    
  )
}

export default App