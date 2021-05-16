import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [ weather, setWeather ] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  const weatherUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`

  useEffect(() => {
    axios
      .get(weatherUrl)
      .then(response => {
        setWeather(response.data)
      })
  }, [weatherUrl])

  if (weather) {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p><b>temperature:</b> {weather.current.temperature} Celcius</p>
        <img alt="Weather icon" src={weather.current.weather_icons[0]} />
        <p><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </div>
    )
  } 
  return (
    <div></div>
  )
}

export default Weather