import "./App.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { set } from "mongoose";
import { AppContext } from "./Context/contextProvider";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from "@mui/material/Paper";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';




import imgc from "./high-temperature.png";
import low from "./low-temperature.png";
import sunrise from "./sunrise.png";
import sunset from "./sunset.png";
import humidity from "./humidity.png";
import pressure from "./pressure.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  // pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function App() {
  const { data, setData} = useContext(AppContext);

  // const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  
  const handleClick = async () => {
    let {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c0d6a40cfe8abfc87502a9f51e41799a`)
    // let {data} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?q=${city}&exclude=hourly,daily&appid=c0d6a40cfe8abfc87502a9f51e41799a`);
    setData(data);
    console.log(data);
    
  }
  // console.log(data);

  useEffect(() => {
    // setTimeout(() => {
      
      let day = new Date();
      const days = ["sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "sat"]
      setDate(days[day.getDay()]);
    // }, 5000);
    setTimeout(() => {
      setLoading(false);
    }, 5000)
  }, []);
  // console.log(city);
  console.log(data);
  
  // if(loading) {
  //   return (
  //     <div>Loading...</div>
  //   )
  // }

  return (
    <>
     {loading ? (
       <div className = "App" style = {{marginTop: 100, paddingRight: 20}}>
         <Stack sx={{ width: '100%', color: 'grey.500', p : 2 }} spacing={2}>
            <LinearProgress color="secondary" />
            <LinearProgress color="success" />
            <LinearProgress color="inherit" />
          </Stack>
       </div>
     ) : (
      <div className="App">
      <Box sx = {{p : 2}}>
        <Paper  elevation={5}>
          <Search sx = {{ fontSize: 20}}>
            <SearchIconWrapper>
              <LocationOnIcon sx = {{ fontSize: 30}} />
            </SearchIconWrapper>
            <StyledInputBase
              onChange = {(e) => {
                setCity(e.target.value);
              }}
              sx = {{fontSize: 22, ml: 2}}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
            <SearchIconWrapper onClick = {handleClick} >
              <SearchIcon className = "searchHover" onClick = {handleClick} sx = {{ml : 50,mt:-11, fontSize: 30}} />
            </SearchIconWrapper>
          </Search>
        </Paper>
        <Paper elevation = {3} sx = {{mt: 5}}>
              <Box >
                <div style = {{marginLeft: "50%", fontWeight: "bolder"}}>{date}</div> 
                <div>
                  
                <div style = {{padding: 10, textAlign: "center", display: "flex"}}>
                
                  <Paper>
                  <b>Temperature</b>
                  <div className = "align" style = {{padding: 20, display: "flex"}}>
                    <div style = {{marginRight: 20}}>
                      <div>
                        <img style = {{width: 40, height: 40, borderRadius: "50%"}}src = {imgc} alt = "high temperature" />
                      </div>
                      <div style = {{fontWeight: "bold"}}>
                        {data.main.temp_max} °F
                      </div>
                    </div>
                    
                    <div>
                      <div>
                          <img style = {{width: 40, height: 40, borderRadius: "50%"}}src = {low} alt = "high temperature" />
                        </div>
                        <div style = {{fontWeight: "bold"}}>
                          {data.main.temp_max} °F
                        </div>
                     
                    </div>
                    
                  </div>
                  </Paper>
                  <Paper sx = {{p : 2}}>
                    <Paper>
                    
                    <div>
                    <div style = {{display: "flex"}}>
                      <div>
                          <img style = {{width: 50, height: 50, borderRadius: "50%"}} src = {`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt = "high temperature" />
                        </div>
                        <div style = {{fontWeight: "bold", marginTop: 4, padding: 10}}>
                          <b>Weather :- {data.weather[0].main}</b>
                          <p style = {{fontWeight: 200, marginTop: -7}}>Description :- {data.weather[0].description}</p>
                        </div>
                    
                    </div>
                    </div>
                    </Paper>
                    <Paper>
                    <div>
                    <div style = {{display: "flex"}}>
                      
                        <div style = {{fontWeight: "bold", marginTop: 4, paddingLeft: 20}}>
                          <p style = {{fontWeight: 300}}>Wind direction :- {data.wind.deg}° </p>
                          <p style = {{fontWeight: 300, textAlign: "left", marginTop: -7}}>speed :- {data.wind.speed}</p>
                        </div>
                     
                    </div>
                    </div>
                    </Paper>
                  </Paper>
                </div>
                </div>
                <div style = {{marginLeft: "30%", fontWeight: "bolder", marginBottom: 20}}>Location:- {data.name}</div> 
                <div style = {{display: "flex", justifyContent: "space-between"}}>
                  <Paper>
                   <div>
                          <img style = {{width: 70, height: 50, borderRadius: "50%"}} src = {sunrise} alt = "sumrise" />
                   </div>
                   <div>
                     sunrise: 6AM
                   </div>
                  </Paper>
                  <Paper>
                   {/* <div>
                          <img style = {{width: 70, height: 50, borderRadius: "50%"}} src = {sunrise} alt = "sumrise" />
                   </div> */}
                   <div style = {{backgroundColor: "skyblue", fontWeight: "bold", borderRadius: "5px", color: "white", padding: 10}}>
                   
                    <div style = {{marginTop: 5}}>
                          <img style = {{width: 40, height: 40, borderRadius: "50%"}}src = {pressure} alt = "high temperature" />
                        </div>
                        <div style = {{fontWeight: "bold"}}>
                        {data.main.pressure} Pressure
                        </div>
                    
                   </div>
                  </Paper>
                  <Paper>
                   
                   <div style = {{backgroundColor: "gray", fontWeight: "bold", borderRadius: "5px", color: "white", padding: 10}}>
                    
                     <div style = {{marginTop: 5}}>
                          <img style = {{width: 40, height: 40, borderRadius: "50%"}}src = {humidity} alt = "high temperature" />
                        </div>
                        <div style = {{fontWeight: "bold"}}>
                        {data.main.humidity} Humidity
                        </div>
                    
                   </div>
                  </Paper>
                  <Paper>
                  <div>
                          <img style = {{width: 70, height: 50, borderRadius: "50%"}} src = {sunset} alt = "sumrise" />
                   </div>
                   <div>
                     sunset: 6PM
                   </div>
                  </Paper>
                </div>
              </Box>
        </Paper>
      </Box>
    </div>
     )}
    </>
    
   
  );
}

export default App;
