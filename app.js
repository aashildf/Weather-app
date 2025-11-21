

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

// Weathercode   →  Description           →             Ikon

// 0	          Klar himmel	                            sunny
// 1,	          Delvis skyet                            partly cloudy
// 2, 3	        Skyet / Overskyet	                      cloud
// 45, 48	      Tåke / Tåkedis	                        foggy
// 51, 53, 55	  Lett / Moderat / Kraftig regn	          rainy
// 61, 63, 65	  Snø / Snøbyger / Kraftig snø	          snowing
// 80, 81, 82	  Regnbyger / Kraftig regnbyger	          rainy
// (default)	  Ukjent vær	                            cloud (fallback)
