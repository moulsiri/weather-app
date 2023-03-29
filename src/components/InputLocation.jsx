import {useContext,useState} from 'react';
import { GlobalContext } from '../Context';
import axios from 'axios';


const InputLocation = () => {

    const {setToggle,makeObject}=useContext(GlobalContext);

    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(false);
    const [locationData,setLocationData]=useState([])
    const [value,setValue]=useState("")

    
    const onChangeHandler=async (e)=>{
        setValue(e.target.value)
        if(e.target.value){
            try{
                let data=await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}&appid=85e6a3721dbf7767c38fae52b898355a`);
                // let tmp=data.data.map((elm)=>elm.name)
                setLocationData(data.data);
            }catch(err){
                console.log(err)
            }
            
            
        }
        else{
            setLocationData([])
        }

    }
    const submitHandler=async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null)

        try{
            if(locationData.length!==0){
                let lat=locationData[0].lat;
                let lon=locationData[0].lon;
                let location=`${locationData[0].name}, ${locationData[0].state?locationData[0].state:locationData[0].country}`
                let {data}=await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=85e6a3721dbf7767c38fae52b898355a`)
                makeObject(data,location)
                setLoading(false)
                setToggle(true)
                setValue("")
                setError(null)
                setLocationData([])

            }else{
                setLoading(false);
                setError("no city found with this name")
            }

        }catch(err){
           setError("No data found")
           setLoading(false)
        }


    }
  return (
    <form onSubmit={submitHandler}>
        <div id="inputField">
        <input type="text" 
        placeholder="Enter city name" 
        onChange={onChangeHandler}
        value={value}/>
        {/* <div id="autoComplete">
            {
                locationData.map((elm,i)=>
                <div 
                key={i} 
                className="aTxt">
                <p>{elm.name}</p></div>)
            }
        </div> */}
        </div>
            {/* <button type='submit' className="btn">Get Weather information</button> */}
            {
            loading
            ?<div id="loader"></div>
            :""
            }
            {
                error?<div id="alert"><i className="ri-error-warning-fill"></i><p>{error}</p></div>
                :""
            }
           
    </form>
  )
}

export default InputLocation