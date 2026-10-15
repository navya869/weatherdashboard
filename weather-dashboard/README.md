# WeatherNow — Live Weather Dashboard

**Created by:** Navya  
**Email:** kuninavya09@gmail.com

A responsive weather dashboard that fetches live weather and a five-day forecast from public Open-Meteo APIs. It demonstrates asynchronous JavaScript (`async`/`await`), the Fetch API, JSON parsing, dynamic rendering, search, and error handling.

## Run it
1. Extract the ZIP.
2. Open the `weather-dashboard` folder in VS Code.
3. Recommended: install the free **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**. You can also open `index.html` directly in a modern browser.
4. Ensure internet access is available because the app uses public APIs and Google Fonts.

## Features
- Search for a city
- Current temperature, feels-like temperature, humidity, wind speed and daily range
- Five-day forecast
- Loading and error states
- Responsive mobile layout
- No API key or paid service required

## APIs
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Weather forecast: `https://api.open-meteo.com/v1/forecast`

## Project structure
- `index.html` — page structure
- `style.css` — responsive styling
- `script.js` — API calls, async/await, JSON parsing and rendering

## Submission checklist
- [ ] Search for at least two cities
- [ ] Check that current weather and forecast appear
- [ ] Test an invalid city to verify error handling
- [ ] Add screenshots of your working app if required by your submission portal

Weather data is provided by Open-Meteo. This student project is for demonstration and is not intended for emergency decisions.
