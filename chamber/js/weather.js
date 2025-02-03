const apiKey = '831a707e5ceb73c0ddb0a8f333a08cd9'; 
const city = 'Nairobi'; 
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    
    const currentWeather = data.list[0];
    const currentTemp = Math.round(currentWeather.main.temp); 
    const weatherDescription = currentWeather.weather.map(event => event.description).join(', '); 
    const icon = currentWeather.weather[0].icon; 

    
    const forecast = data.list
      .filter((item, index) => index % 8 === 0) 
      .slice(0, 3) 
      .map(day => ({
        date: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }), 
        temp: Math.round(day.main.temp), 
        icon: day.weather[0].icon, 
        description: day.weather[0].description, 
      }));

    
    const currentWeatherHTML = `
      <div class="weather-card">
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherDescription}">
        <p>${weatherDescription}</p>
        <p>${currentTemp}°C</p>
      </div>
    `;

    
    const forecastHTML = forecast.map(day => `
      <div class="weather-card">
        <p>${day.date}</p>
        <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.description}">
        <p>${day.description}</p>
        <p>${day.temp}°C</p>
      </div>
    `).join('');

    
    document.getElementById('weather-data').innerHTML = currentWeatherHTML + forecastHTML;
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    document.getElementById('weather-data').innerHTML = `<p>Failed to load weather data. Please try again later.</p>`;
  });