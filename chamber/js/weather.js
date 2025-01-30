const apiKey = 'sk-40d34c0f669f4c82aeee91bd3721a983'; // Replace with yo ur actual API key
const city = 'Nairobi'; // Set the city to Nairobi, Kenya
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Extract current weather data
    const currentWeather = data.list[0];
    const currentTemp = Math.round(currentWeather.main.temp); // Round temperature to whole number
    const weatherDescription = currentWeather.weather.map(event => event.description).join(', '); // Handle multiple weather events
    const icon = currentWeather.weather[0].icon; // Weather icon code

    // Extract 3-day forecast data
    const forecast = data.list
      .filter((item, index) => index % 8 === 0) // Get one forecast per day
      .slice(0, 3) // Limit to 3 days
      .map(day => ({
        date: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }), // Format date as "Mon", "Tue", etc.
        temp: Math.round(day.main.temp), // Round temperature to whole number
        icon: day.weather[0].icon, // Weather icon code
      }));

    // Generate HTML for weather section
    const weatherHTML = `
      <div class="current-weather">
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherDescription}">
        <p>${currentTemp}°C</p>
        <p>${weatherDescription}</p>
      </div>
      <div class="forecast">
        ${forecast.map(day => `
          <div class="forecast-day">
            <p>${day.date}</p>
            <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${weatherDescription}">
            <p>${day.temp}°C</p>
          </div>
        `).join('')}
      </div>
    `;

    // Insert weather HTML into the page
    document.getElementById('weather-data').innerHTML = weatherHTML;
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    document.getElementById('weather-data').innerHTML = `<p>Failed to load weather data. Please try again later.</p>`;
  });