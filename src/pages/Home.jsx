import { useState, useEffect, useCallback } from "react";
import { CloudOff, Loader } from "lucide-react";

import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import AQICard from "../components/AQICard";

import {
  getCurrentWeather,
  getForecast,
  getAirQuality,
} from "../services/weatherService";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    if (!city) return;

    setIsLoading(true);
    setError(null);

    try {
      const currentWeather = await getCurrentWeather(city);
      setWeather(currentWeather);

      const { lat, lon } = currentWeather.coord;

      const [forecastData, aqiData] = await Promise.all([
        getForecast(lat, lon),
        getAirQuality(lat, lon),
      ]);

      setHourly(forecastData.list.slice(0, 8));

      const dailyData = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setDaily(dailyData);

      setAirQuality(aqiData);
    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
      setWeather(null);
      setHourly([]);
      setDaily([]);
      setAirQuality(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByLocation = useCallback(() => {
    if (!navigator.geolocation) {
      fetchWeatherData("Delhi");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
          );

          const data = await res.json();
          fetchWeatherData(data?.name || "Delhi");
        } catch {
          fetchWeatherData("Delhi");
        }
      },
      () => fetchWeatherData("Delhi")
    );
  }, []);

  useEffect(() => {
    fetchWeatherByLocation();
  }, [fetchWeatherByLocation]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
            Weather Forecast
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Real-time weather data and forecasts
          </p>
        </div>

        {/* Search */}
        <div className="flex gap-3 justify-center">
          <SearchBar onSearch={fetchWeatherData} isLoading={isLoading} />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-16 h-16 text-blue-500 animate-spin mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Loading weather data...
            </p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center">
            <CloudOff className="w-16 h-16 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Oops!</h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        )}

        {/* Weather Data */}
        {weather && !isLoading && (
          <>
            <WeatherCard weather={weather} />
            {hourly.length > 0 && <HourlyForecast hourly={hourly} />}

            <div className="grid md:grid-cols-2 gap-6">
              {daily.length > 0 && <DailyForecast daily={daily} />}
              {airQuality && <AQICard airQuality={airQuality} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
