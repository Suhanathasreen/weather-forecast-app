const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const statusText = document.querySelector("#status");
const weatherCard = document.querySelector("#weather");

const weatherCodes = {
  0: ["Clear sky", "☀️"],
  1: ["Mainly clear", "🌤️"],
  2: ["Partly cloudy", "⛅"],
  3: ["Overcast", "☁️"],
  45: ["Fog", "🌫️"],
  48: ["Depositing rime fog", "🌫️"],
  51: ["Light drizzle", "🌦️"],
  53: ["Moderate drizzle", "🌦️"],
  55: ["Dense drizzle", "🌧️"],
  61: ["Slight rain", "🌦️"],
  63: ["Moderate rain", "🌧️"],
  65: ["Heavy rain", "🌧️"],
  71: ["Slight snow", "🌨️"],
  73: ["Moderate snow", "🌨️"],
  75: ["Heavy snow", "❄️"],
  80: ["Rain showers", "🌦️"],
  81: ["Moderate rain showers", "🌧️"],
  82: ["Violent rain showers", "⛈️"],
  95: ["Thunderstorm", "⛈️"],
  96: ["Thunderstorm with hail", "⛈️"],
  99: ["Thunderstorm with heavy hail", "⛈️"]
};

function setStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.classList.toggle("error", isError);
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Weather service request failed. Please try again.");
  return response.json();
}

async function searchWeather(city) {
  const geoUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
  geoUrl.search = new URLSearchParams({ name: city, count: "1", language: "en", format: "json" });
  const geoData = await getJson(geoUrl);

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found. Check the spelling and try again.");
  }

  const place = geoData.results[0];
  const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");
  forecastUrl.search = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,pressure_msl,wind_speed_10m",
    timezone: "auto",
    forecast_days: "1"
  });
  const forecastData = await getJson(forecastUrl);
  showWeather(place, forecastData.current);
}

function showWeather(place, current) {
  const [description, icon] = weatherCodes[current.weather_code] || ["Weather conditions unavailable", "🌡️"];
  document.querySelector("#location").textContent = [place.name, place.admin1, place.country].filter(Boolean).join(", ");
  document.querySelector("#condition").textContent = description;
  document.querySelector("#weather-icon").textContent = icon;
  document.querySelector("#temperature").textContent = `${Math.round(current.temperature_2m)}°C`;
  document.querySelector("#feels-like").textContent = `Feels like ${Math.round(current.apparent_temperature)}°C`;
  document.querySelector("#humidity").textContent = `${current.relative_humidity_2m}%`;
  document.querySelector("#wind").textContent = `${current.wind_speed_10m} km/h`;
  document.querySelector("#pressure").textContent = `${Math.round(current.pressure_msl)} hPa`;
  weatherCard.classList.remove("hidden");
  setStatus("Weather updated successfully.");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (!city) {
    setStatus("Please enter a city name.", true);
    return;
  }

  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = "Loading…";
  setStatus(`Getting weather for ${city}…`);
  try {
    await searchWeather(city);
  } catch (error) {
    setStatus(error.message || "Something went wrong. Please try again.", true);
  } finally {
    button.disabled = false;
    button.textContent = "Search";
  }
});
