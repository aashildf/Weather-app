const description = {
  0: "Klar himmel",
  1: "Delvis skyet",
  2: "Skyet",
  3: "Overskyet",
  45: "Tåke",
  48: "Tåkedis",
  51: "Lett regn",
  53: "Moderat regn",
  55: "Kraftig regn",
  61: "Lett regn",
  63: "Moderat regn",
  65: "Kraftig regn",
  71: "Lett snø",
  73: "Snøbyger",
  75: "Kraftig snø",
  77: "Snøkorn",
  80: "Regnbyger",
  81: "Regnbyger",
  82: "Kraftig regnbyger",
  95: "Torden",
  96: "Torden",
  99: "Kraftig torden",
};

const customContent = {
  0: { text: "Sol over Fløyen, for en perfekt dag! Ta med kaffe på termos og finn en benk med utsikt. Bergen glitrer når solen skinner.", image: "icons/sunnygirl.svg" },
  1: { text: "Ingen regn i sikte! Skyer eller ei, benytt sjansen til å ta en tur i Akvariet, du vet aldri når sjansen byr seg igjen.", image: "icons/cloudy_girl.svg" },
  2: { text: "En strålende dag, ifølge bergensere...for det regner jo ikke! Så kom deg ut og nyt en god middag på en av de koselige spisestedene.", image: "icons/cloudy_girl.svg" },
  3: { text: "Det ser ut til å bli oppholdsvær i dag. Kom deg ut og nyt Bergen mellom bygene.", image: "icons/cloudy_girl.svg" },
  51: { text: "Det ser ut til at det kommer til å regne litt i dag. Ta med deg paraplyen, og opplev Bergen slik den vanligvis er!", image: "icons/rain_girl.svg" },
  53: { text: "Det regner i Bergen i dag! Finn frem regnjakken og gå en tur langs Bryggen. Byen er aller vakrest når den speiler seg i vannet.", image: "icons/rain_girl.svg" },
  55: { text: "Det regner mye i Bergen i dag! Finn frem regnjakken — her er det ikke langt mellom sjarmerende butikker og koselige kafeer.", image: "icons/rain_girl.svg" },
  61: { text: "Det regner litt i Bergen i dag. Finn frem paraplyen og ta en rolig tur langs Bryggen.", image: "icons/rain_girl.svg" },
  63: { text: "Moderat regn over byen. Perfekt dag for å finne en koselig kafé i Skostredet og nyte en varm kopp kaffe.", image: "icons/rain_girl.svg" },
  65: { text: "Det pøser ned! Finn frem oljeuhyret og opplev en autentisk Bergensk dag.", image: "icons/rain_girl.svg" },
  80: { text: "Skyene ligger lavt over byen. Finn roen på en kafé i Marken, og se regndråpene danse på vinduet.", image: "icons/rain_girl.svg" },
  81: { text: "Regnbyger og skiftende vær, ta på deg støvler og gå en tur ned på fisketorget.", image: "icons/rain_girl.svg" },
  82: { text: "Det pøser ned! Finn frem oljeuhyret og opplev en autentisk Bergensk dag.", image: "icons/rain_girl.svg" },
  71: { text: "Det snør litt i Bergen i dag! Sjeldent syn — nyt det mens det varer og ta en tur opp på Fløyen.", image: "icons/winter_girl.svg" },
  73: { text: "Snøbyger over byen. Ta en rusletur langs Lille Lungegårdsvann.", image: "icons/winter_girl.svg" },
  75: { text: "Kraftig snø, tid for kakao! Fryser det ordentlig til kan du kanskje gå på skøyter på Lungegårdsvannet?", image: "icons/winter_girl.svg" },
  95: { text: "Lyn og torden! Løp inn og finn en bortgjemt kafé blant Bergens vakre smau.", image: "icons/storm.svg" },
  96: { text: "Torden ruller over fjellene, kom deg inn under tak.", image: "icons/storm.svg" },
  99: { text: "Lyn og torden! Kom deg vekk fra uværet — i dag er det best å se byen mellom de 7 fjell trygt innenfra.", image: "icons/storm.svg" },
};

function getIcon(code) {
  switch (code) {
    case 0: return "icons/sun.svg";
    case 1: return "icons/partly_cloudy.svg";
    case 2: case 3: return "icons/cloudy.svg";
    case 45: case 48: return "icons/fog.svg";
    case 51: case 61: return "icons/light_rain.svg";
    case 53: case 63: return "icons/moderate_rain.svg";
    case 55: case 65: return "icons/heavy_rain.svg";
    case 80: case 81: case 82: return "icons/heavy_rain.svg";
    case 71: case 73: case 75: case 77: return "icons/snow.svg";
    case 95: case 96: case 99: return "icons/thunder.svg";
    default: return "icons/cloudy.svg";
  }
}

async function getTodayWeather() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast" +
      "?latitude=60.39299&longitude=5.32415" +
      "&current_weather=true" +
      "&hourly=temperature_2m,weathercode,precipitation_probability,wind_speed_10m" +
      "&timezone=auto&forecast_days=2"
    );
    const data = await response.json();

    const currentWeatherCode = data.current_weather.weathercode;

    document.getElementById("today-bg-icon").src = getIcon(currentWeatherCode);

    const today = new Date();
    document.getElementById("today-date").textContent = today.toLocaleDateString("no-NO", {
      weekday: "long", day: "numeric", month: "long"
    });

    const hourlyTimes = data.hourly.time;
    const hourlyTemps = data.hourly.temperature_2m;
    const hourlyCodes = data.hourly.weathercode;
    const hourlyPrecip = data.hourly.precipitation_probability;
    const hourlyWind = data.hourly.wind_speed_10m;

    const now = new Date();
    const localHour =
      `${now.getFullYear()}-` +
      `${String(now.getMonth() + 1).padStart(2, "0")}-` +
      `${String(now.getDate()).padStart(2, "0")}T` +
      `${String(now.getHours()).padStart(2, "0")}`;
    const currentIndex = hourlyTimes.findIndex(t => t.startsWith(localHour));

    const code = currentIndex >= 0 ? hourlyCodes[currentIndex] : currentWeatherCode;
    const extra = customContent[code];
    const textEl = document.getElementById("today-custom-text");
    const figureEl = document.getElementById("today-custom-figure");
    if (extra) {
      textEl.textContent = extra.text;
      figureEl.innerHTML = `<img src="${extra.image}" alt="">`;
    } else {
      textEl.textContent = "Været er skiftende, ta det som det kommer.";
      figureEl.innerHTML = `<img src="icons/cloudy_girl.svg" alt="">`;
    }

    // Generer oppsummeringstekst frå dagens timevise data
    const todayTemps = hourlyTemps.filter((_, i) => i < 24);
    const todayCodes = hourlyCodes.filter((_, i) => i < 24);
    const todayWind = hourlyWind.filter((_, i) => i < 24);
    const todayPrecip = hourlyPrecip ? hourlyPrecip.filter((_, i) => i < 24) : [];

    const freq = {};
    todayCodes.forEach(c => freq[c] = (freq[c] || 0) + 1);
    const dominant = parseInt(Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0]);
    const maxTemp = Math.max(...todayTemps);
    const minTemp = Math.min(...todayTemps);
    const maxWind = Math.round(Math.max(...todayWind));
    const maxPrecipProb = todayPrecip.length ? Math.max(...todayPrecip) : 0;

    let summary = `${description[dominant] || "Skiftende vær"} ventes over Bergen i dag. `;
    summary += `Temperaturer mellom ${minTemp}° og ${maxTemp}°C`;
    if (maxWind > 8) summary += `, med vind opp til ${maxWind} km/t`;
    summary += ".";
    if (maxPrecipProb >= 20) summary += ` Nedbørssannsynlighet opp til ${maxPrecipProb}%.`;

    const summaryEl = document.getElementById("today-summary");
    if (summaryEl) summaryEl.textContent = summary;

    const container = document.getElementById("today-detail");
    container.innerHTML = "";

    const startIdx = currentIndex >= 0 ? currentIndex : 0;

    for (let i = startIdx; i < Math.min(hourlyTimes.length, 26); i++) {
      const time = hourlyTimes[i].slice(11, 16);
      const temp = hourlyTemps[i];
      const hCode = hourlyCodes[i];
      const precip = hourlyPrecip ? (hourlyPrecip[i] ?? 0) : "–";
      const wind = hourlyWind[i] ?? 0;
      const isNow = i === currentIndex;

      container.innerHTML += `
        <div class="forecast-detail-item${isNow ? " today-now" : ""}">
          <img src="${getIcon(hCode)}" alt="${description[hCode] || "Vær"}" />
          <div class="forecast-detail-day">
            <div class="day-name">${isNow ? "Nå · " : ""}${time}</div>
            <div class="day-desc">${description[hCode] || "Ukjent vær"}</div>
            <div class="forecast-detail-stats">
              <span>Nedbør: ${precip}%</span>
              <span>Vind: ${wind} km/t</span>
            </div>
          </div>
          <div class="forecast-detail-temps">
            ${temp}°
          </div>
        </div>
      `;
    }
  } catch (e) {
    console.error(e);
  }
}

getTodayWeather();
