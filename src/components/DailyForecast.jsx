import { getWeatherIconUrl, formatDate } from "../utils/weatherIcons";

export default function DailyForecast({ daily }) {
  if (!daily || daily.length === 0) return null;

  return (
    <div className="glass-card p-6 rounded-3xl">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        5-Day Forecast
      </h3>

      <div className="space-y-3">
        {daily.slice(0, 5).map((day, index) => (
          <div
            key={index}
            className="glass-card p-4 rounded-2xl flex items-center justify-between"
          >
            <div className="flex items-center gap-4 flex-1">
              <p className="text-base font-medium text-gray-700 dark:text-gray-300 w-24">
                {index === 0 ? "Today" : formatDate(day.dt)}
              </p>

              <img
                src={getWeatherIconUrl(day.weather[0].icon)}
                alt={day.weather[0].description}
                className="w-10 h-10"
              />

              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize flex-1">
                {day.weather[0].description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-base font-bold text-gray-800 dark:text-white">
                {Math.round(day.main.temp_max)}°
              </p>
              <p className="text-base text-gray-500 dark:text-gray-400">
                {Math.round(day.main.temp_min)}°
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
