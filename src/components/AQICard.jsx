import { Wind } from "lucide-react";
import { getAQILevel } from "../utils/weatherIcons";

export default function AQICard({ airQuality }) {
  if (!airQuality) return null;

  const aqi = airQuality.main.aqi;
  const components = airQuality.components;

  const { level, color, bgColor } = getAQILevel(aqi);

  return (
    <div className="glass-card p-6 rounded-3xl">
      <div className="flex items-center gap-3 mb-4">
        <Wind className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Air Quality
        </h3>
      </div>

      {/* AQI Summary */}
      <div className={`${bgColor} p-4 rounded-2xl mb-4`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              AQI Index
            </p>
            <p className={`text-3xl font-bold ${color}`}>
              {aqi}
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white/40 dark:bg-black/30">
            <p className={`text-lg font-semibold ${color}`}>
              {level}
            </p>
          </div>
        </div>
      </div>

      {/* Pollutants */}
      <div className="grid grid-cols-2 gap-3">
        <Pollutant label="PM2.5" value={components.pm2_5} unit="μg/m³" />
        <Pollutant label="PM10" value={components.pm10} unit="μg/m³" />
        <Pollutant label="CO" value={components.co} unit="μg/m³" />
        <Pollutant label="NO₂" value={components.no2} unit="μg/m³" />
      </div>
    </div>
  );
}

function Pollutant({ label, value, unit }) {
  return (
    <div className="glass-card p-4 rounded-2xl">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-xl font-bold text-gray-800 dark:text-white">
        {value.toFixed(1)}
      </p>
      <p className="text-xs text-gray-500">
        {unit}
      </p>
    </div>
  );
}
