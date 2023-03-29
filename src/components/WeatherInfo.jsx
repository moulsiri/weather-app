import {useContext, useState} from 'react';
import { GlobalContext } from '../Context';
import LazyLoad from 'react-lazy-load'
import {BsMoisture} from 'react-icons/bs'
import './weatherStyle.css';
import axios from 'axios';


const WeatherInfo = () => {
    const {setToggle,weatherData}=useContext(GlobalContext);

    if(weatherData){
        return (
            <div className="w-content">
                <h3> 
                    <i className="ri-arrow-left-line" onClick={()=>{setToggle(false)}}></i> 
                     Weather App</h3>
                <div id="weathercard">
                    <div id="w-icon">
                    <LazyLoad height={80} >
                        <img src={`https://openweathermap.org/img/wn/${weatherData?.icon}@2x.png`} alt="" />
                        </LazyLoad>
                    </div>
                    <h1>{weatherData?.temprature.toFixed(2)} 	&deg; C</h1>
                    <h6>{weatherData?.description}</h6>
                    <p><i className="ri-map-pin-line"></i>{weatherData?.location}</p>
        
                </div>
                <div id="extraData">
                    <div className="exElm">
                    <i className="ri-temp-hot-line"></i>
                    <div>
                        <h6>{weatherData?.feels_like.toFixed(2)} &deg; C</h6>
                        <p>Feels like</p>
                        </div>
                    </div>
                    <div className="exElm">
                        <BsMoisture style={{ color:'rgb(83, 82, 82)'}}></BsMoisture>
                        <div>
                            <h6>{weatherData?.humidity}%</h6>
                            <p>Humidity</p>
                        </div>
                    </div>
        
                </div>
            </div>
          )
    }else{
        return <></>

    }
 
 
}

export default WeatherInfo