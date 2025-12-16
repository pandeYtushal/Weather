const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Current weather
export async function getCurrentWeather(city) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "City not found");

  return data;
}

// FREE forecast API (5-day / 3-hour)
export async function getForecast(lat, lon) {
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch forecast data");

  return data;
}

// AQI (still free)
export async function getAirQuality(lat, lon) {
  const res = await fetch(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch air quality data");

  return data.list[0];
}
