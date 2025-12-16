import { getWeatherIconUrl, formatTime } from '../utils/weatherIcons';

export default function HourlyForecast({ hourly }) {
  const next24Hours = hourly.slice(0, 24);

  return (
    <div className="glass-card p-6 rounded-3xl">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Hourly Forecast
      </h3>
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2">
          {next24Hours.map((hour, index) => (
            <div
              key={index}
              className="glass-card min-w-[100px] p-4 rounded-2xl flex flex-col items-center"
            >
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                {index === 0 ? 'Now' : formatTime(hour.dt)}
              </p>
              <img
                src={getWeatherIconUrl(hour.weather[0].icon)}
                alt={hour.weather[0].description}
                className="w-12 h-12 my-2"
              />
              <p className="text-xl font-bold text-gray-800 dark:text-white">
                {Math.round(hour.temp)}°
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">
                {hour.weather[0].main}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
