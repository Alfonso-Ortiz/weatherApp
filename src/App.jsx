import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./Components/WeatherCard";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();

  const success = (pos) => {
    console.log(pos.coords);
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  };

  useEffect(() => {
    if (coords) {
      const apiKey = "408bb61be38da04e13dbd0f72c7f9a07";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;
      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const farenheit = (celsius * (9 / 5) + 32).toFixed(1);
          setTemp({
            celsius,
            farenheit,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  console.log(weather);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <div className="App">
      <WeatherCard weather={weather} temp={temp} />
    </div>
  );
}

export default App;
