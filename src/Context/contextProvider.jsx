import {createContext, useState, useEffect} from "react";
import axios from "axios";

const AppContext = createContext();
const AppContextProvider = ({children}) => {

   const [lat, setLat] = useState("");
   const [lon, setLon] = useState("");
    const [data, setData] = useState({});
    



   const currentData = async () => {
    // let {data} = await axios.post(`api.openweathermap.org/data/2.5/weather?lat=22.5297&lon=88.3563&appid=c0d6a40cfe8abfc87502a9f51e41799a`)
    // let {data} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=c0d6a40cfe8abfc87502a9f51e41799a`)
    let { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=22.5297&lon=88.3563&appid=c0d6a40cfe8abfc87502a9f51e41799a`
    );
    // let {data} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=22.5297&lon=88.3563&exclude=hourly,daily&appid=c0d6a40cfe8abfc87502a9f51e41799a`)
    
    // console.log(data);
    setData(data);
  };
      
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            setLat(position.coords.latitude);
            setLon(position.coords.longitude)
            console.log("Longitude is :", position.coords.longitude);
      
          });
          currentData();
          

    }, [])



    return (
        <AppContext.Provider value = {{data, setData}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider};