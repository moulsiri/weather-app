import {useState,useContext} from 'react'
import InputLocation from './InputLocation';
import axios from 'axios';
import { GlobalContext } from '../Context';


const Location = ({addStyle}) => {
  const {setToggle,makeObject}=useContext(GlobalContext);
  const [loading,setLoading]=useState(false);


  const [curLocation,setCurLocation]=useState(null);


  const getWeather=async (lat,lon,location)=>{
    try{

      let {data}=await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=85e6a3721dbf7767c38fae52b898355a`)
      makeObject(data,location);
      setToggle(true);
      setLoading(false);
    }catch(err){
      console.log(err);
      setLoading(false);

    }
  }
  const getLocationHandler=async ()=>{
  navigator.geolocation.getCurrentPosition( async function(elm){
    let lat=elm.coords.latitude;
    let lon=elm.coords.longitude;
    try{

      let {data}=await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=85e6a3721dbf7767c38fae52b898355a`)
      let location=`${data[0].name}, ${data[0].state?data[0].state:data[0].country}`

      setCurLocation(data[0])
      setLoading(true);
      getWeather(lat,lon,location)
      

      
    }catch(err){
      setLoading(false);
      console.log(err)

    }


  })
  }
   
  return (
    <div className="content" style={addStyle}>
        <h3>Weather App</h3>
        <InputLocation/>
        <div className="seperation">
            <div className="line"></div>
            <p>or</p>
            <div className="line"></div>
        </div>
        {
          loading
        ?<div id="loader"></div>
        :""
        }
        {
          curLocation
          ?<p className='curr-location'
        style={{display:'flex',alignItems:'center'}}>
        <i className="ri-map-pin-line"
           style={{marginRight:'1em'}}/>
          {curLocation.name}, {curLocation?.state}
        </p>
        :""
        }
        
        <button className="btn" onClick={getLocationHandler}>Get Device Location</button>
    </div>
  )
}

export default Location