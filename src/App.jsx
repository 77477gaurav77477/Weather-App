import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import axios from "axios";
import bglight from "./assets/images/Bg-light.avif";
import LoadingAnimation from "./components/LoadingAnimation";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [city, setCity] = useState("");
  const [hdata, setHdata] = useState(null);
  const [avgday1, setAvgday1] = useState(null);
  const [avgday2, setAvgday2] = useState(null);
  const [avgday3, setAvgday3] = useState(null);
  const [avgday4, setAvgday4] = useState(null);
  const [avgday5, setAvgday5] = useState(null);
  const [animationClass, setAnimationClass] = useState(false);
  const [scale, setScale] = useState("Celsius");
  const [symbol, setSymbol] = useState("°C");
  const [currentLocation, setCurrentLocation] = useState(null);

  // Function to process weather data and set daily averages
  const processWeatherData = (weatherData) => {
    // Reset all day averages
    setAvgday1(null);
    setAvgday2(null);
    setAvgday3(null);
    setAvgday4(null);
    setAvgday5(null);

    if (weatherData && weatherData.list) {
      const citySunrise = weatherData.city?.sunrise
        ? new Date(weatherData.city.sunrise * 1000).toLocaleTimeString()
        : "N/A";
      const citySunset = weatherData.city?.sunset
        ? new Date(weatherData.city.sunset * 1000).toLocaleTimeString()
        : "N/A";

      weatherData.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const day = date.getDate();
        const temp = item.main.temp;
        const condition = item.weather[0].main;
        const humidity = item.main.humidity;
        const feelslike = item.main.feels_like;
        const pressure = item.main.pressure;
        const windDirection = item.wind.deg;
        const visibility = item.visibility;

        const baseData = {
          temp,
          condition,
          humidity,
          feelslike,
          count: 1,
          pressure,
          windDirection,
          visibility,
          sunrise: citySunrise,
          sunset: citySunset,
          day,
        };

        const updateAverage = (prev) => {
          if (!prev) {
            return baseData;
          }
          return {
            temp: (prev.temp * prev.count + temp) / (prev.count + 1),
            condition,
            humidity:
              (prev.humidity * prev.count + humidity) / (prev.count + 1),
            feelslike:
              (prev.feelslike * prev.count + feelslike) / (prev.count + 1),
            count: prev.count + 1,
            pressure:
              (prev.pressure * prev.count + pressure) / (prev.count + 1),
            windDirection:
              (prev.windDirection * prev.count + windDirection) /
              (prev.count + 1),
            visibility:
              (prev.visibility * prev.count + visibility) / (prev.count + 1),
            sunrise: citySunrise,
            sunset: citySunset,
            day,
          };
        };

        const today = new Date().getDate();
        if (day === today + 1) {
          setAvgday1(updateAverage);
        } else if (day === today + 2) {
          setAvgday2(updateAverage);
        } else if (day === today + 3) {
          setAvgday3(updateAverage);
        } else if (day === today + 4) {
          setAvgday4(updateAverage);
        } else if (day === today + 5) {
          setAvgday5(updateAverage);
        }
      });
    }
  };

  // Function to fetch weather data by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const metricUnits = scale === "Celsius" ? "metric" : "imperial";
      const getWeatherhrUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${metricUnits}&appid=${apiKey}`;
      const weatherHrResponse = await axios.get(getWeatherhrUrl);
      const weatherData = weatherHrResponse.data;
      setHdata(weatherData);

      // Set city name from weather data
      setCity(weatherData.city?.name || "Current Location");

      processWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Get user's current location on component mount
  useEffect(() => {
    const getCurrentLocationWeather = async () => {
      setAnimationClass(true);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setCurrentLocation({ lat, lon });
            await fetchWeatherByCoords(lat, lon);
            setAnimationClass(false);
          },
          (error) => {
            console.error("Geolocation error:", error);
            setAnimationClass(false);
            // Fallback: you could set a default city here
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setAnimationClass(false);
      }
    };

    getCurrentLocationWeather();
  }, [scale]); // Re-run when scale changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      setAnimationClass(true);

      // Set symbol based on scale
      setSymbol(scale === "Celsius" ? "°C" : "°F");

      const goeurl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
      const georesponse = await axios.get(goeurl);

      if (georesponse.data.length === 0) {
        alert("City not found. Please try again.");
        setAnimationClass(false);
        return;
      }

      const { lat, lon } = georesponse.data[0];
      await fetchWeatherByCoords(lat, lon);

      setAnimationClass(false);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setAnimationClass(false);
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleScaleChange = (e) => {
    const newScale = e.target.value;
    setScale(newScale);
    setSymbol(newScale === "Celsius" ? "°C" : "°F");
  };

  return (
    <>
      {animationClass ? (
        <LoadingAnimation />
      ) : (
        <div
          className={`flex flex-col justify-between items-center min-h-screen bg-blue-100 p-3 transition-all duration-500 ${
            animationClass ? "opacity-75" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url(${bglight})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-between align-center w-9/10">
            <form
              className="flex flex-col justify-center align-center w-full"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                onChange={handleChange}
                value={city}
                placeholder="Enter City Name"
                className="border-2 border-black rounded-md p-3 w-full text-xl m-1 mb-3"
              />
              <label
                htmlFor="scale"
                className="self-center text-md font-medium mb-2 text-black border-3 border-black p-1 rounded-md w-4/10"
              >
                <select
                  name="Scale"
                  id="scale"
                  className="bg-blue-100 outline-none w-12/12 cursor-pointer rounded-md"
                  onChange={handleScaleChange}
                  value={scale}
                >
                  <option value="Celsius">Celsius</option>
                  <option value="Fahrenheit">Fahrenheit</option>
                </select>
              </label>
              <button
                className="self-center min-w-min w-3/10 bg-green-500 text-white p-2 mt-3 mb-2 text-lg rounded-md cursor-pointer hover:bg-green-600 ease-in-out duration-300 disabled:bg-gray-400"
                type="submit"
                disabled={animationClass}
              >
                {animationClass ? "Loading..." : "Get Weather"}
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-between h-full items-start w-full border-2 border-black leading-10">
            <div>
              <h2 className="text-3xl font-medium mb-2">
                {city || "Current Location"}
              </h2>
              <div>
                <h3 className="text-md font-medium">
                  🌡 Temp: {avgday1 ? Math.round(avgday1.temp) : "N/A"} {symbol}
                </h3>
              </div>
              <h3 className="text-md font-medium">
                🤔 Feels Like: {avgday1 ? Math.round(avgday1.feelslike) : "N/A"}{" "}
                {symbol}
              </h3>
              <div>
                <h3 className="text-md font-medium">
                  💧 Humidity: {avgday1 ? Math.round(avgday1.humidity) : "N/A"}%
                </h3>
              </div>
            </div>

            <div className="w-full">
              <h1 className="text-4xl font-semibold mb-2">Hourly</h1>
              <div className="flex overflow-x-auto scrollbar-hide space-x-4 mb-3">
                {hdata ? (
                  hdata.list.slice(0, 8).map((item) => (
                    <WeatherCard
                      key={item.dt}
                      time={new Date(item.dt * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      temp={Math.round(item.main.temp)}
                      feelslike={Math.round(item.main.feels_like)}
                      humidity={Math.round(item.main.humidity)}
                      condition={item.weather[0].main}
                      symbol={symbol}
                    />
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>

            <div className="w-full">
              <h1 className="text-4xl font-semibold mb-2">Daily</h1>
              <div className="flex overflow-x-auto scrollbar-hide space-x-4">
                {hdata ? (
                  <>
                    {avgday1 && (
                      <WeatherCard
                        key="day1"
                        date="Tomorrow"
                        temp={Math.round(avgday1.temp)}
                        feelslike={Math.round(avgday1.feelslike)}
                        humidity={Math.round(avgday1.humidity)}
                        condition={avgday1.condition}
                        symbol={symbol}
                      />
                    )}
                    {avgday2 && (
                      <WeatherCard
                        key="day2"
                        date="Day After"
                        temp={Math.round(avgday2.temp)}
                        feelslike={Math.round(avgday2.feelslike)}
                        humidity={Math.round(avgday2.humidity)}
                        condition={avgday2.condition}
                        symbol={symbol}
                      />
                    )}
                    {avgday3 && (
                      <WeatherCard
                        key="day3"
                        date="Day 3"
                        temp={Math.round(avgday3.temp)}
                        feelslike={Math.round(avgday3.feelslike)}
                        humidity={Math.round(avgday3.humidity)}
                        condition={avgday3.condition}
                        symbol={symbol}
                      />
                    )}
                    {avgday4 && (
                      <WeatherCard
                        key="day4"
                        date="Day 4"
                        temp={Math.round(avgday4.temp)}
                        feelslike={Math.round(avgday4.feelslike)}
                        humidity={Math.round(avgday4.humidity)}
                        condition={avgday4.condition}
                        symbol={symbol}
                      />
                    )}
                    {avgday5 && (
                      <WeatherCard
                        key="day5"
                        date="Day 5"
                        temp={Math.round(avgday5.temp)}
                        feelslike={Math.round(avgday5.feelslike)}
                        humidity={Math.round(avgday5.humidity)}
                        condition={avgday5.condition}
                        symbol={symbol}
                      />
                    )}
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between w-full border-2 border-black p-4 mt-4">
            <div>
              <h2 className="text-md font-medium">
                🌅 Sunrise: {avgday1?.sunrise || "N/A"}
              </h2>
            </div>
            <div>
              <h2 className="text-md font-medium">
                🌇 Sunset: {avgday1?.sunset || "N/A"}
              </h2>
            </div>
            <div>
              <h2 className="text-md font-medium">
                📈 Pressure:{" "}
                {avgday1 ? Math.round(avgday1.pressure) + " hPa" : "N/A"}
              </h2>
            </div>
            <div>
              <h2 className="text-md font-medium">
                🌬 Wind Direction:{" "}
                {avgday1 ? Math.round(avgday1.windDirection) + "°" : "N/A"}
              </h2>
            </div>
            <div>
              <h2 className="text-md font-medium">
                🌫 Visibility:{" "}
                {avgday1
                  ? (avgday1.visibility / 1000).toFixed(1) + " km"
                  : "N/A"}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
