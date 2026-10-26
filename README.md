# Weather Forecast App

A beginner-friendly weather dashboard built with HTML, CSS, and JavaScript. Search for a city to see its current temperature, feels-like temperature, humidity, wind speed, pressure, and weather condition.

## Features

- Search weather by city name
- Current temperature and feels-like temperature
- Humidity, wind speed, and pressure
- Weather condition labels and emoji icons
- Responsive layout for mobile and desktop
- Uses the free Open-Meteo geocoding and forecast APIs; no API key is required

## Run locally

1. Download and extract this repository ZIP.
2. Open `index.html` in a browser.
3. Make sure you have an internet connection so the app can request weather data.

If your browser blocks API requests when opening the file directly, run a local server from this folder, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- [Open-Meteo API](https://open-meteo.com/)

## Project structure

```text
weather-forecast-app/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Possible improvements

- Add a 5-day forecast
- Add a °C / °F toggle
- Add a current-location option
- Add recent-search history
- Add loading animations and more detailed error messages

## License

This project is provided for learning and educational use.
