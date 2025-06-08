const apiKey = "8f5ffa381bf66b7201cb821ee90fa137"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetchWeather(url);
}

async function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      fetchWeather(url);
    }, () => {
      document.getElementById("weatherOutput").innerHTML = "Location access denied.";
    });
  } else {
    document.getElementById("weatherOutput").innerHTML = "Geolocation not supported.";
  }
}

async function fetchWeather(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById("weatherOutput").innerHTML = `Error: ${data.message}`;
    } else {
      const output = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;
      document.getElementById("weatherOutput").innerHTML = output;
    }
  } catch (error) {
    document.getElementById("weatherOutput").innerHTML = "Error fetching data.";
  }
}
