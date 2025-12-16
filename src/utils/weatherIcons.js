export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const getAQILevel = (aqi) => {
  switch (aqi) {
    case 1:
      return { level: 'Good', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' };
    case 2:
      return { level: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' };
    case 3:
      return { level: 'Moderate', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/30' };
    case 4:
      return { level: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/30' };
    case 5:
      return { level: 'Very Poor', color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/30' };
    default:
      return { level: 'Unknown', color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-900/30' };
  }
};

export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
};

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};
