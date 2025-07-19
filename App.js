import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "ac523f75182c91978376ebb67e4a1d2c";

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="overlay">
        <div className="input-wrapper">
          <input
            className="input-bar"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>{weather.main.temp} °C</p>
            <p>{weather.weather[0].main}</p>
            <img
              alt="weather icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
