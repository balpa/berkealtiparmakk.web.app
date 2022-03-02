import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { API } from './api';
// HOOKS *******************

import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import LoginIcon from '@mui/icons-material/Login';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import TheatersIcon from '@mui/icons-material/Theaters';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
// MUI ********************

import * as firebase from "firebase/app";
import "firebase/auth";
import app from './firebase'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// FIREBASE **************

import Authenticator from './components/Authenticator';
import LogOutSection from './components/LogOutSection';
import HomeContent from './components/HomeContent';
import ContactContent from './components/ContactContent';
import WCContent from './components/WCContent';
import PlaygroundContent from './components/PlaygroundContent';
import Clock from './components/Clock';
import MediaContent from './components/MediaContent';
// COMPONENTS-ICONS *************

import { useSpring, } from 'react-spring'
import { light } from '@mui/material/styles/createPalette';
// VISUAL _ ANIMATION ********


function App() {
  const auth = getAuth();

  const [position, setPosition] = useState(true)
  const [isDark, setisDark] = useState(false)
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [showAuthenticator, setshowAuthenticator] = useState(false)
  const [isAtHome, setisAtHome] = useState(true)
  const [isAtContact, setisAtContact] = useState(false)
  const [isAtPlayground, setisAtPlayground] = useState(false)
  const [isAtWC, setisAtWC] = useState(false)
  const [isAtMedia, setIsAtMedia] = useState(false)
  const [showThemeChangeComponent, setShowThemeChangeComponent] = useState(false)
  const [showWeatherComponent, setShowWeatherComponent] = useState(false)
  const [expandedRGBheight, setExpandedRGBheight] = useState("30%")
  const [isExpanded, setIsExpanded] = useState(false)
  const [RGBcolor, setRGBcolor] = useState(null)
  const [redColor, setRedColor] = useState("214")
  const [greenColor, setGreenColor] = useState("25")
  const [blueColor, setBlueColor] = useState("93")
  const [isLoading, setIsLoading] = useState(false)

  const [isActiveHome, setIsActiveHome] = useState("")
  const [isActivePlayground, setIsActivePlayground] = useState("")
  const [isActiveWC, setIsActiveWC] = useState("")
  const [isActiveMedia, setIsActiveMedia] = useState("")
  const [isActiveContact, setIsActiveContact] = useState("")

  const [weatherData, setWeatherData] = useState(null)

  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [status, setStatus] = useState(null)


  // const [lightThemeColor, setLightThemeColor] = useState("rgba(220, 20, 60, 0.61)")  // CRIMSONLIGHT
  // const [darkThemeColor, setDarkThemeColor] = useState("rgba(107, 13, 32, 0.678)")   // CRIMSONDARK

  const [lightThemeColor, setLightThemeColor] = useState("rgba(214,25,93,0.61)")
  const [darkThemeColor, setDarkThemeColor] = useState("rgba(100, 15, 50, 0.68)")

  const [savedThemeLight, setSavedThemeLight] = useState("")
  const [savedThemeDark, setSavedThemeDark] = useState("")

  const orangeLight = "rgb(214, 79, 31)"
  const orangeDark = "rgb(143, 53, 20)"

  const greenLight = "rgb(62, 155, 57)"
  const greenDark = "rgb(31, 78, 28)"

  const purpleLight = "rgb(130, 95, 135)"
  const purpleDark = "rgb(76, 26, 84)"

  const defaultLight = "rgba(214,25,93, 0.61)"
  const defaultDark = "rgba(100,15,50, 0.678)"

console.log(lightThemeColor)
  // const spring = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

  const setThemeColorToLocalStorage = () => {         // LOCAL STORAGE'A BIR ADET GEC KAYIT EDIYOR KONTROL ET CALLBACK FONKSIYON
    window.localStorage.setItem('light-theme-color', savedThemeLight);
    window.localStorage.setItem('dark-theme-color', savedThemeDark);
  }

  // useEffect(async() => {                // LOCAL STORAGE'TAN RENK ALINMIYOR KONTROL ET
  //     let light = await JSON.parse(window.localStorage.getItem('light-theme-color'));
  //     let dark = await JSON.parse(window.localStorage.getItem('dark-theme-color'));

  //     setLightThemeColor(light)
  //     setDarkThemeColor(dark)
  //     console.log(light,dark)

  // }, []);

  useEffect(() => {                         // GEOLOCATION
    if (!navigator.geolocation) {
      setStatus(false);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setStatus(true)
      }, () => {
        setStatus(false);
      })
    }
  }, [])

  useEffect(()=>{                     // WRITE "LOADING" IF NULL
    if (lat && lon){
     setIsLoading(false)
    }
    else{
      setIsLoading(true)
    }
  },[lon])

  useEffect(async() => {                  // GET WEATHER
    if (status == true) {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API.weather}&q=${lat},${lon}`)
      const data = await response.json()
      setWeatherData(data)
      console.log(data)
    }
    else {
      console.log("status still false")
    }
  },[status])

  // const getWeather = async() => {        // GET WEATHER ON CLICK
  //   if (status == true) {
  //     const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`)
  //     const data = await response.json()
  //     setWeatherData(data)
  //     console.log(data)
  //   }
  //   else {
  //     console.log("status still false")
  //   }
  // }


  onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    setisLoggedIn(true)
  } else {
    setisLoggedIn(false)
  }
  });

  const moveBoxFunc = () => {
  setPosition(!position)
  }

  useEffect(() => {     // THEME RGB EXPAND
    if (isExpanded){
      setExpandedRGBheight("50%")
    }
    else{
      setExpandedRGBheight("30%")
    }
  }, [isExpanded])


  useEffect(() => {   // RANGE INPUT VERISI ILE RENK DEGISTIR
    setLightThemeColor(`rgb(${redColor},${greenColor},${blueColor},0.61)`)
    setDarkThemeColor(`rgb(${redColor-114},${greenColor-10},${blueColor-43},0.678)`)

  }, [redColor, greenColor, blueColor])

  //    MENU ACTIVE PAGE COLOR CHANGE
  //******************************** */

  useEffect(() => {
    if (isAtHome == true){setIsActiveHome("-active")}
    else{setIsActiveHome("")}}, [isAtHome])

   useEffect(() => {
    if (isAtPlayground == true){setIsActivePlayground("-active")}
    else{setIsActivePlayground("")}}, [isAtPlayground])

   useEffect(() => {
    if (isAtWC == true) {setIsActiveWC("-active")}
    else{setIsActiveWC("")}}, [isAtWC])

   useEffect(() => {
    if (isAtMedia == true){setIsActiveMedia("-active")}
    else{setIsActiveMedia("")}}, [isAtMedia])

   useEffect(() => {
    if (isAtContact == true){setIsActiveContact("-active")}
    else{setIsActiveContact("")}}, [isAtContact])

  //******************************** */


  const ChangeThemeComponent = ({isDark})=>{

    const expandRGB = () => {
      setIsExpanded(!isExpanded)
    }
    const Rgbslider = () => {

      return (
        <>
        <div className="rgb-sliders">
          <span>{redColor}</span>
          <input type="range" min="0" max="255" value={`${redColor}`} onChange={(e)=> setRedColor(e.target.value)}/>
          <span>{greenColor}</span>
          <input type="range" min="0" max="255" value={`${greenColor}`} onChange={(e)=> setGreenColor(e.target.value)}/>
          <span>{blueColor}</span>
          <input type="range" min="0" max="255" value={`${blueColor}`} onChange={(e)=> setBlueColor(e.target.value)}/>
       </div>
        </>
      )
    }

    return (
      <>
      <div className="change-theme-component" style={isDark ?{backgroundColor:"rgba(21,34,56,0.98)",transition:"2s"}:{backgroundColor:"rgb(179,206,229)",transition:"2s"}}>
        <button id="theme-button" style={{backgroundColor:`${orangeLight}`}} onClick={()=>{setLightThemeColor(orangeLight);setDarkThemeColor(orangeDark);setSavedThemeDark(orangeDark);setSavedThemeLight(orangeLight);setThemeColorToLocalStorage()}}>Orange</button>
        <button id="theme-button" style={{backgroundColor:`${greenLight}`}} onClick={()=>{setLightThemeColor(greenLight);setDarkThemeColor(greenDark);setSavedThemeDark(greenDark);setSavedThemeLight(greenLight);setThemeColorToLocalStorage()}}>Green</button>
        <button id="theme-button" style={{backgroundColor:`${purpleLight}`}} onClick={()=>{setLightThemeColor(purpleLight);setDarkThemeColor(purpleDark);setSavedThemeDark(purpleDark);setSavedThemeLight(purpleLight);setThemeColorToLocalStorage()}}>Purple</button>
        <button id="theme-button" style={{backgroundColor:`${defaultLight}`}} onClick={()=>{setLightThemeColor(defaultLight);setDarkThemeColor(defaultDark);setSavedThemeDark(defaultDark);setSavedThemeLight(defaultLight);setThemeColorToLocalStorage()}}>Default</button>
        <button onClick={()=>{expandRGB()}} style={{cursor:"pointer",border:"none",borderRadius:"25px",backgroundColor:"rgba(255,255,255,0.4)",color:"black",marginBottom:"5px"}}>
          {isExpanded ? "Close" : "Expand for RGB"}
          </button>

        {isExpanded ? <Rgbslider /> : null}
      </div>
      </>
    )
  }

  const WeatherComponent = ({isDark})=>{

    return (
      <>
      <div className="weather-component" style={isDark ?{color: "wheat",backgroundColor:"rgba(21,34,56,0.98)",transition:"2s"}:{backgroundColor:"rgb(179,206,229)",transition:"2s"}}>
        {weatherData != null && `Location:  ${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}`} <br />
        {weatherData != null && `Condition: ${weatherData.current.condition.text}`}<br />
        {isLoading ? "Loading... Check if location is enabled." : null}
        {weatherData != null && `Temp:  ${weatherData.current.temp_c}°C`} <br />
        {weatherData != null && `Feels Like:  ${weatherData.current.feelslike_c}°C`}<br />
        {weatherData != null && `Wind Direction:  ${weatherData.current.wind_dir}`}<br />
        {weatherData != null && `Wind KPH:  ${weatherData.current.wind_kph}`}<br />
        {weatherData != null && `Last Updated:  ${weatherData.current.last_updated}`}
      </div>
      </>
    )
  }

  return (
    <>

    <div className="bodyWrapper" style={isDark ? {backgroundColor:`${darkThemeColor}`} : {backgroundColor:`${lightThemeColor}`}}>
        <span id="darkModeSpan">
        {isDark ? <DarkModeIcon htmlColor="wheat" sx={{boxShadow:3}} style={{position:"absolute",borderRadius:"50%",right:"0",marginTop:"0.5em",marginRight:"0.7em"}} onClick={() => {setisDark(!isDark)}} />
                          : <DarkModeOutlinedIcon sx={{boxShadow:3}} style={{position:"absolute",borderRadius:"50%",right:"0",marginTop:"0.5em",marginRight:"0.7em"}} onClick={()=> {setisDark(!isDark)}} />}
        </span>
        <span id="toggle-theme">
        {isDark ? <ColorLensOutlinedIcon htmlColor="wheat" sx={{boxShadow:3}} style={{position:"absolute",borderRadius:"50%",right:"0",marginTop:"2em",marginRight:"0.7em"}}
          onClick={() => {
            setShowThemeChangeComponent(!showThemeChangeComponent)
            if (showWeatherComponent){setShowWeatherComponent(false)}
          }}/>
                          : <ColorLensIcon sx={{boxShadow:3}} style={{position:"absolute",borderRadius:"50%",right:"0",marginTop:"2em",marginRight:"0.7em"}}
          onClick={()=> {
            setShowThemeChangeComponent(!showThemeChangeComponent)
            if (showWeatherComponent){setShowWeatherComponent(false)}
            }}/>}
        </span>
        <span id="weather">
        {isDark ? <ThermostatIcon htmlColor="wheat" sx={{boxShadow:3}} style={{position:"absolute",borderRadius:"50%",right:"0",marginTop:"3.5em",marginRight:"0.7em"}}
          onClick={() => {
            setShowWeatherComponent(!showWeatherComponent)
            if (showThemeChangeComponent){setShowThemeChangeComponent(false)}
          }} />
                          : <ThermostatIcon sx={{boxShadow:3}} style={{position:"absolute",borderRadius:"50%",right:"0",marginTop:"3.5em",marginRight:"0.7em"}}
          onClick={()=> {
            setShowWeatherComponent(!showWeatherComponent)
            if (showThemeChangeComponent){setShowThemeChangeComponent(false)}
            }} />}
        </span>

        <div className="menu" style={isDark ? {backgroundColor:"rgba(255, 255, 255, 0.238)"}:{}} >
          <span onClick={()=> {setisAtHome(true);setisAtPlayground(false);setisAtWC(false);setisAtContact(false);setIsAtMedia(false)}} id={`icons-very-left${isActiveHome}`} style={isDark ? {color:"wheat"} : {}}>
            {isDark ? <HomeOutlinedIcon htmlColor="wheat" style={{transition: "2s"}} /> : <HomeOutlinedIcon htmlColor="black" style={{transition: "2s"}} />}
            Home
          </span>
          <span onClick={()=> {setisAtHome(false);setisAtPlayground(true);setisAtWC(false);setisAtContact(false);setIsAtMedia(false)}}  id={`icons${isActivePlayground}`} style={isDark ? {color:"wheat"} : {}}>
            {isDark ? <CallToActionOutlinedIcon htmlColor="wheat" style={{transition: "2s"}} /> : <CallToActionOutlinedIcon htmlColor="black" style={{transition: "2s"}} />}
            Playground
          </span>
          <span onClick={()=> {setisAtHome(false);setisAtPlayground(false);setisAtWC(true);setisAtContact(false);setIsAtMedia(false)}} id={`icons${isActiveWC}`} style={isDark ? {color:"wheat"} : {}}>
            {isDark ? <WcOutlinedIcon htmlColor="wheat" style={{transition: "2s"}} /> : <WcOutlinedIcon htmlColor="black" style={{transition: "2s"}} />}
            WC
          </span>
          <span onClick={()=> {setisAtHome(false);setisAtPlayground(false);setisAtWC(false);setisAtContact(false);setIsAtMedia(true)}} id={`icons${isActiveMedia}`} style={isDark ? {color:"wheat"} : {}}>
            {isDark ? <TheatersOutlinedIcon htmlColor="wheat" style={{transition: "2s"}} /> : <TheatersOutlinedIcon htmlColor="black" style={{transition: "2s"}} />}
            Media
          </span>
          <span onClick={()=> {setisAtHome(false);setisAtPlayground(false);setisAtWC(false);setisAtContact(true);setIsAtMedia(false)}}  id={`icons-very-right${isActiveContact}`} style={isDark ? {color:"wheat"} : {}}>
            {isDark ? <ContactMailOutlinedIcon htmlColor="wheat" style={{transition: "2s"}} /> : <ContactMailOutlinedIcon htmlColor="black" style={{transition: "2s"}} />}
            Contact
          </span>
        </div>

        {isLoggedIn ? <LogOutSection isDark = {isDark} auth={auth} /> : [ !showAuthenticator ? <LoginIcon style={
          isDark ? {position:"absolute",marginLeft:"0.5em",marginTop:"0.5em",transition:"2s",color:"wheat"
               } : {position:"absolute",marginLeft:"0.5em",marginTop:"0.5em",transition:"2s"}}
               onClick={()=> setshowAuthenticator(!showAuthenticator)}/> : <Authenticator isDark={isDark} /> ]}

       {isAtHome ? <HomeContent isAtHome={isAtHome} isDark={isDark} /> : null}
       {isAtPlayground ? <PlaygroundContent isAtPlayground={isAtPlayground} isDark={isDark}/> : null}
       {isAtWC ? <WCContent isDark={isDark} isAtWC={isAtWC} isLoggedIn={isLoggedIn}/> : null}
       {isAtContact ? <ContactContent isAtContact={isAtContact} isDark={isDark}/> : null}
       {isAtMedia ? <MediaContent isAtMedia={isAtMedia} isDark={isDark}/> : null}
      
      <div style={{position:"absolute", bottom:"5%",width:"99vw",textAlign:"center"}}> site under construction</div>
      <div className="footer" style={isDark ? {color: "wheat"} : {}}>
        <Clock isDark={isDark} />
      </div>
    </div>

    {showThemeChangeComponent ? <ChangeThemeComponent showThemeChangeComponent={showThemeChangeComponent} isDark={isDark}/> : null}
    {showWeatherComponent ? <WeatherComponent showWeatherComponent={showWeatherComponent} isDark={isDark}/> : null}


    </>
  );
}


export default App;
