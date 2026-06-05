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
  0: {
    text: "Sol over Fløyen, for en perfekt dag! Ta med kaffe på termos og finn en benk med utsikt. Bergen glitrer når solen skinner.",
    image: "icons/sunnygirl.svg",
  },
  1: {
    text: "Ingen regn i sikte! Skyer eller ei, benytt sjansen til å ta en tur i Akvariet, du vet aldri når sjansen byr seg igjen.",
    image: "icons/cloudy_girl.svg",
  },
  2: {
    text: "En strålende dag, ifølge bergensere...for det renger jo ikke! Så kom deg ut og nyt en god middag på en av de koselige spisestedene.",
    image: "icons/cloudy_girl.svg",
  },
  3: {
    text: "Det ser ut til å bli oppholdsvær fremover. Kom deg ut og nyt Bergen mellom bygene.",
    image: "icons/cloudy_girl.svg",
  },
  51: {
    text: "Det ser ut til at det kommer til å regne litt. Ta med deg paraplyen, og opplev Bergen slik den vanligvis er!",
    image: "icons/rain_girl.svg",
  },
  53: {
    text: "Det regner i Bergen! Finn frem regnjakken og gå en tur langs Bryggen. Finnes ikke dårlig vær, bare dårlige klær.",
    image: "icons/rain_girl.svg",
  },
  55: {
    text: "Det regner mye fremover! Finn frem regnjakken og nyt sjarmerende butikker og koselige kafeer.",
    image: "icons/rain_girl.svg",
  },
  61: {
    text: "Lett regn fremover. Finn frem paraplyen og opplev Bergen slik den vanligvis er!",
    image: "icons/rain_girl.svg",
  },
  63: {
    text: "Moderat regn fremover. Perfekt dag for å finne en koselig kafé i Skostredet.",
    image: "icons/rain_girl.svg",
  },
  65: {
    text: "Det pøser ned fremover! Finn frem oljeuhyret og opplev en autentisk Bergensk uke.",
    image: "icons/rain_girl.svg",
  },
  80: {
    text: "Regnbyger i vente. Finn roen på en kafé i Marken, og se regndråpene danse på vinduet.",
    image: "icons/rain_girl.svg",
  },
  81: {
    text: "Regnbyger og skiftende vær fremover. Ta på deg støvler og utforsk Bergen.",
    image: "icons/rain_girl.svg",
  },
  82: {
    text: "Det pøser ned! Finn frem oljeuhyret og opplev en autentisk Bergensk uke.",
    image: "icons/rain_girl.svg",
  },
  71: {
    text: "Lett snø fremover! Sjeldent syn i Bergen - nyt det mens det varer.",
    image: "icons/winter_girl.svg",
  },
  73: {
    text: "Snøbyger i vente. Ta en rusletur langs Lille Lungegårdsvann og la deg omslutte av det mystiske lyset.",
    image: "icons/winter_girl.svg",
  },
  75: {
    text: "Kraftig snø fremover, tid for kakao! Kanskje skøyter på Lungegårdsvannet?",
    image: "icons/winter_girl.svg",
  },
  95: {
    text: "Torden i vente! Hold deg innendørs og besøk Grieghallen eller en av Bergens koselige kafeer.",
    image: "icons/storm.svg",
  },
  96: {
    text: "Torden ruller over fjellene. Finn en bortgjemt kafé mellom Bergens vakre smau.",
    image: "icons/storm.svg",
  },
  99: {
    text: "Kraftig torden fremover! I dag er det best å se Bergen mellom de 7 fjell trygt innenfra.",
    image: "icons/storm.svg",
  },
};

function getIcon(code) {
  switch (code) {
    case 0:
      return "icons/sun.svg";
    case 1:
      return "icons/partly_cloudy.svg";
    case 2:
    case 3:
      return "icons/cloudy.svg";
    case 45:
    case 48:
      return "icons/fog.svg";
    case 51:
      return "icons/light_rain.svg";
    case 53:
      return "icons/moderate_rain.svg";
    case 55:
      return "icons/heavy_rain.svg";
    case 61:
      return "icons/light_rain.svg";
    case 63:
      return "icons/moderate_rain.svg";
    case 65:
      return "icons/heavy_rain.svg";
    case 80:
    case 81:
    case 82:
      return "icons/heavy_rain.svg";
    case 71:
    case 73:
    case 75:
    case 77:
      return "icons/snow.svg";
    case 95:
    case 96:
    case 99:
      return "icons/thunder.svg";
    default:
      return "icons/cloudy.svg";
  }
}

async function getForecast() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast" +
      "?latitude=60.39299&longitude=5.32415" +
      "&current_weather=true" +
      "&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,wind_speed_10m_max" +
      "&timezone=auto&forecast_days=7"
    );
    const data = await response.json();

    const daily = data.daily;
    const todayCode = daily.weathercode[0];

    document.getElementById("forecast-bg-icon").src = getIcon(todayCode);

    const startDate = new Date(daily.time[0]).toLocaleDateString("no-NO", { day: "numeric", month: "long" });
    const endDate = new Date(daily.time[daily.time.length - 1]).toLocaleDateString("no-NO", { day: "numeric", month: "long" });
    document.getElementById("forecast-dates").textContent = `${startDate} – ${endDate}`;

    const extra = customContent[todayCode];
    const textEl = document.getElementById("forecast-custom-text");
    const figureEl = document.getElementById("forecast-custom-figure");
    if (extra) {
      textEl.textContent = extra.text;
      figureEl.innerHTML = `<img src="${extra.image}" alt="Ekstra værbilde">`;
    } else {
      textEl.textContent = "Været er skiftende fremover, ta det som det kommer.";
      figureEl.innerHTML = `<img src="icons/cloudy_girl.svg" alt="Standard bilde">`;
    }

    const container = document.getElementById("forecast-detail");
    container.innerHTML = "";

    for (let i = 0; i < daily.time.length; i++) {
      const date = new Date(daily.time[i]);
      const isToday = i === 0;
      const weekday = isToday
        ? "I dag"
        : date.toLocaleDateString("no-NO", { weekday: "long" });
      const max = daily.temperature_2m_max[i];
      const min = daily.temperature_2m_min[i];
      const code = daily.weathercode[i];
      const precip = daily.precipitation_sum[i] ?? 0;
      const wind = daily.wind_speed_10m_max[i] ?? 0;

      container.innerHTML += `
        <div class="forecast-detail-item">
          <img src="${getIcon(code)}" alt="${description[code] || "Vær"}" />
          <div class="forecast-detail-day">
            <div class="day-name">${weekday}</div>
            <div class="day-desc">${description[code] || "Ukjent vær"}</div>
            <div class="forecast-detail-stats">
              <span>Nedbør: ${precip} mm</span>
              <span>Vind: ${wind} km/t</span>
            </div>
          </div>
          <div class="forecast-detail-temps">
            ${max}° <span class="temp-min">/ ${min}°</span>
          </div>
        </div>
      `;
    }
  } catch (e) {
    document.getElementById("forecast-header-desc").textContent =
      "Feil ved henting av vær";
  }
}

getForecast();
