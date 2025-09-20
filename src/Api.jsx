import axios from "axios";
import { useState } from "react";

const apiKey = "e1b4cf0a374cdb415c9fc756360f02a0";

export const getweather = async (city) => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  const geoResponse = await axios.get(geoUrl);
  const { latt, lonn } = geoResponse.data[0];
  setLat(latt);
  setLon(lonn);
  console.log(lat, lon);

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const forecastResponse = await axios.get(forecastUrl);
  return forecastResponse.data;
};
export const getWeekWeather = async (city) => {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&units=metric&appid=${apiKey}&cnt=5`;
  const forecastResponse = await axios.get(forecastUrl);
  return forecastResponse.data;
};
