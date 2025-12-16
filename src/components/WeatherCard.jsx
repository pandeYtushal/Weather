import { Droplets, Wind, Gauge } from "lucide-react";
import { getWeatherIconUrl } from "../utils/weatherIcons";

export default function WeatherCard({ weather }) {
  return (
    <div className="glass-card p-5 sm:p-8 rounded-3xl">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">

        {/* Left Section */}
        <div className="flex-1 text-center md:text-left w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-1">
            {weather.name}, {weather.sys.country}
          </h2>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 capitalize mb-4">
            {weather.weather[0].description}
          </p>

          {/* Temp Row */}
          <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4">
            <img
              src={getWeatherIconUrl(weather.weather[0].icon)}
              alt={weather.weather[0].description}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
            />

            <div>
              <p className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-800 dark:text-white leading-none">
                {Math.round(weather.main.temp)}°
              </p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Feels like {Math.round(weather.main.feels_like)}°
              </p>
            </div>
          </div>
        </div>

        {/* Right Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 w-full md:w-auto">

          <div className="glass-card p-3 sm:p-4 rounded-2xl flex flex-col items-center">
            <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mb-1" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Humidity
            </p>
            <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              {weather.main.humidity}%
            </p>
          </div>

          <div className="glass-card p-3 sm:p-4 rounded-2xl flex flex-col items-center">
            <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mb-1" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Wind
            </p>
            <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              {Math.round(weather.wind.speed * 3.6)} km/h
            </p>
          </div>

          <div className="glass-card p-3 sm:p-4 rounded-2xl flex flex-col items-center col-span-2 md:col-span-1">
            <Gauge className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mb-1" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Pressure
            </p>
            <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              {weather.main.pressure} hPa
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
