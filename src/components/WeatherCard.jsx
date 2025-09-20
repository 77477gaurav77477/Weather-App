import React from "react";
import sunny from "../assets/images/Clear.jpg";
import cloudy from "../assets/images/Cloud.jpg";
import rainy from "../assets/images/Rain.jpeg";
import snowy from "../assets/images/Snow.jpg";
import thunder from "../assets/images/ThunderStorm.jpg";

const WeatherCard = (props) => {
  const conditionBgImg = {
    Clear: `url(${sunny})`,
    Clouds: `url(${cloudy})`,
    Rain: `url(${rainy})`,
    Snow: `url(${snowy})`,
    Thunderstorm: `url(${thunder})`,
    Drizzle: `url(${rainy})`,
    Mist: `url(${rainy})`,
  };
  const bgImg = conditionBgImg[props.condition] || "none";
  return (
    <div
      className={`sm:min-w-[50%] lg:min-w-[20%] bg-white  p-6 rounded-xl shadow-md back min-w-[100%] `}
      style={{
        backgroundImage: bgImg,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {props.time ? (
        <h3 className="text-lg font-medium text-white">
          🕛 Time:{props.time}{" "}
        </h3>
      ) : (
        <h3 className="text-lg font-medium text-white">
          {" "}
          📅 Date: {props.date}
        </h3>
      )}
      <h3 className="text-lg font-medium text-white">
        🌡 Temp: {props.temp} {props.symbol}
      </h3>
      <h3 className="text-lg font-medium text-white">
        🤔 Feels Like: {props.feelslike} {props.symbol}
      </h3>
      <h3 className="text-lg font-medium text-white">
        💧 Humidity:{props.humidity}{" "}
      </h3>
      <h3 className="text-lg font-medium text-white">
        ☁ Condition: {props.condition}{" "}
      </h3>
    </div>
  );
};

export default WeatherCard;
