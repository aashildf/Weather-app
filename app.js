

async function getWeather() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=60.39299&longitude=5.32415&current_weather=true"
    );
    const data = await response.json();

    const temperature = data.current_weather.temperature;
    const code = data.current_weather.weathercode;

    const description = {
      0: "Klar himmel",
      1: "Delvis skyet",
      2: "Skyet",
      3: "Overskyet",
      45: "Tåke",
      48: "Tåkedis",
      51: "Lett regn",
      53: "Moderate regn",
      55: "Kraftig regn",
      61: "Snø",
      63: "Snøbyger",
      65: "Kraftig snø",
      80: "Regnbyger",
      81: "Regnbyger",
      82: "Kraftig regnbyger",
    };

    document.getElementById("temp").textContent = temperature + "°C";
    document.getElementById("desc").textContent =
      description[code] || "Ukjent vær";

    // Update weather-icon

   const iconImg = document.getElementById("weather-icon");
    switch (code) {
  case 0:
    iconImg.src = "icons/sun.svg";
    break;
  case 1:
    iconImg.src = "icons/partly_cloudy.svg";
    break;
  case 2:
  case 3:
    iconImg.src = "icons/cloudy.svg";
    break;
  case 45:
  case 48:
    iconImg.src = "icons/fog.svg";
    break;
  case 51:
    iconImg.src = "icons/light_rain.svg";
    break;
  case 53:
    iconImg.src = "icons/moderate_rain.svg";
    break;
  case 55:
    iconImg.src = "icons/heavy_rain.svg";
  case 80:
  case 81:
  case 82:
    iconImg.src = "icons/heavy_rain.svg";
    break;
  case 61:
  case 63:
  case 65:
    iconImg.src = "icons/snow.svg";
    break;
  case 95:
  case 96:
  case 99:
    iconImg.src = "icons/thunder.svg";
    break;
  default:
    iconImg.src = "icons/cloudy.svg";
}
 } catch (e) {
    document.getElementById("desc").textContent = "Feil ved henting av vær";
  }
}
getWeather();

// Update everyt 10. minut
setInterval(getWeather, 10 * 60 * 1000);


// Next weather: today/ days to come
const url =
  "https://api.open-meteo.com/v1/forecast?latitude=60.39&longitude=5.32&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // 🔹 Dagens vær
      const current = data.current_weather;
      document.querySelector(
        ".weather-temp"
      ).textContent = `${current.temperature}°C`;
      document.querySelector(".weather-desc").textContent = "Klar himmel"; // Du kan mappe weathercode senere

      // Next 3 hours
      const hourlyTimes = data.hourly.time;
      const hourlyTemps = data.hourly.temperature_2m;
      const now = new Date();
      const currentHour = now.getHours();

      const hourlyContainer = document.querySelector(".forecast-grid.hourly");
      hourlyContainer.innerHTML = ""; // Tøm først

      for (let i = currentHour + 1; i <= currentHour + 3; i++) {
        const time = hourlyTimes[i].slice(11, 16); // "HH:MM"
        const temp = hourlyTemps[i];
        hourlyContainer.innerHTML += `
        <div class="forecast-hour">
          <img src="icons/cloudy.svg" alt="Cloudy" />
          <div>${time} – ${temp}°C</div>
        </div>
      `;
      }

      //  Next 3 days
      const dailyContainer = document.querySelector(".forecast-grid.daily");
      dailyContainer.innerHTML = ""; // Tøm først

      for (let i = 1; i <= 3; i++) {
        const date = new Date(data.daily.time[i]);
        const weekday = date.toLocaleDateString("no-NO", { weekday: "short" });
        const max = data.daily.temperature_2m_max[i];
        const min = data.daily.temperature_2m_min[i];

        dailyContainer.innerHTML += `
        <div class="forecast-day">
          <img src="icons/partly_cloudy.svg" alt="Partly Cloudy" />
          <div>${weekday} – Max ${max}° / Min ${min}°</div>
        </div>
      `;
      }
    });
