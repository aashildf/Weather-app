// Description of weather with code
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
  95: "Torden",
  96: "Torden",
  99: "Kraftig torden",
};

// Custom weathertext and picture

const customContent = {
  // Sol
  0: {
    text: "Sol over Fløyen, for en perfekt dag! Ta med kaffe på termos og finn en benk med utsikt. Bergen glitrer når solen skinner.",
    image: "icons/sunnygirl.svg",
  },

  // Skyet (1,2,3)
  1: {
    text: "Ingen regn i sikte! Skyer eller ei, benytt sjansen til å ta en tur i Akvariet, du vet aldri når sjansen byr seg igjen.",
    image: "icons/cloudy_girl.svg",
  },
  2: {
    text: "En strålende dag, ifølge bergensere...for det renger jo ikke! Så kom deg ut, ta en tur i Skostredet og nyt en god middag på en av de koselige spisestedene etterpå. ",
    image: "icons/cloudy_girl.svg",
  },
  3: {
    text: "Det ser ut til å  bli oppholdsvær i dag. Kom deg ut og nyt været, Bergen er aller vakrest mellom bygene",
    image: "icons/cloudy_girl.svg",
  },

  // Regn (51–55, 80–82)
  51: {
    text: "Det ser ut til at det kommer til å regne litt i dag. Ta med deg paraplyen, og opplev Bergen slik den vanligvis er!",
    image: "icons/rain_girl.svg",
  },
  53: {
    text: "Det regner i Bergen i dag! Finn frem regnjakken og gå en tur langs Bryggen. Byen er aller vakrest når den speiler seg i vannet.",
    image: "icons/rain_girl.svg",
  },
  55: {
    text: "Det regner mye i Bergen i dag! Finn frem regnjakken og gå en tur i sentrum, her er det ikke langt mellom sjarmerende butikker og koselige kafeer- om det skulle komme en skikkelig skyllebøtte .",
    image: "icons/rain_girl.svg",
  },
  80: {
    text: "Skyene ligger lavt over byen. Finn roen på en kafé i Marken, og se regndråpene danse på vinduet.",
    image: "icons/rain_girl.svg",
  },
  81: {
    text: "Regnbyger og skiftende vær, ta på deg støvler og gå en tur ned på fisketorget, her er mange rare krabber og bergensere.",
    image: "icons/rain_girl.svg",
  },
  82: {
    text: "Det pøser ned! Finn frem oljeuhyret og opplev en autentisk Bergensk dag. Og har du ikke regnjakke, kan du jo ta turen innom en av de mange lokale butikkens som tilbyr ekte Bergensk regnbekledning. Kommer sydvesten på mote igjen mon tro?.",
    image: "icons/rain_girl.svg",
  },

  // Snø (61–65)
  61: {
    text: "Det snør i bergen i dag! Gjør som bergensere flest, og ta Fløybanen opp for å stå på ski eller ake ned igjen, gøy for både liten og stor!!",
    image: "icons/winter_girl.svg",
  },
  63: {
    text: "Snøbygene ligger tett over byen. Ta en rusletur langs Lille Lungegårdsvann, og la deg omslutte av det mystiske lyset.",
    image: "icons/winter_girl.svg",
  },
  65: { text: "Kraftig snø, tid for kakao! Eller hvem vet, fryser det ordentlig på kan du kanskje gå på skøyter på Lungegårdsvannet?", image: "icons/winter_girl.svg" },

  // Torden (95–99)
  95: {
    text: "Lyn og torden! Løp inn og finn er bortgjemt kafe blandt Bergens vakre smau, det er aldri feil å gå seg vill!",
    image: "icons/storm.svg",
  },
  96: {
    text: "Torden ruller over fjellene, kom deg inn under tak, og benytt gjerne sjansen til å besøke Grieghallen, kanskje en konsert med Dovregubbens hall passer i dag?",
    image: "icons/storm.svg",
  },
  99: {
    text: "Lyn og torden! Kom deg vekk fra uværet, i dag er det best å se byen mellom de 7 fjell trygt innenfra. ",
    image: "icons/storm.svg",
  },
};


//  Function to get the right icon
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
    case 80:
    case 81:
    case 82:
      return "icons/heavy_rain.svg";
    case 61:
    case 63:
    case 65:
      return "icons/snow.svg";
    case 95:
    case 96:
    case 99:
      return "icons/thunder.svg";
    default:
      return "icons/cloudy.svg";
  }
}

// Weather now
async function getWeather() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=60.39299&longitude=5.32415&current_weather=true"
    );
    const data = await response.json();

    const temperature = data.current_weather.temperature;
    const code = data.current_weather.weathercode;

    document.getElementById("temp").textContent = temperature + "°C";
    document.getElementById("desc").textContent =
      description[code] || "Ukjent vær";

    const iconImg = document.getElementById("weather-icon");
    iconImg.src = getIcon(code);

    // custom text and picture
 
    const extra = customContent[code];
    const textContainer = document.querySelector(".custom-text");
    const figureContainer = document.querySelector(".custom-figure");

    if (extra) {
      textContainer.textContent = extra.text;
      figureContainer.innerHTML = `<img src="${extra.image}" alt="Ekstra værbilde">`;
    } else {
      textContainer.textContent =
        "Været er skiftende, ta det som det kommer.";
      figureContainer.innerHTML = `<img src="icons/cloudy_girl.svg" alt="Standard bilde">`;
    }

  } catch (e) {
    document.getElementById("desc").textContent = "Feil ved henting av vær";
  }
}
getWeather();
setInterval(getWeather, 10 * 60 * 1000); // Update every 10. minute

// next hours and days
const url =
  "https://api.open-meteo.com/v1/forecast?latitude=60.39&longitude=5.32&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // weather today
    const current = data.current_weather;
    document.querySelector(
      ".weather-temp"
    ).textContent = `${current.temperature}°C`;
    document.querySelector(".weather-desc").textContent =
      description[current.weathercode] || "Ukjent vær";

    // Next 3 hours
    const hourlyTimes = data.hourly.time;
    const hourlyTemps = data.hourly.temperature_2m;
    const hourlyCodes = data.hourly.weathercode;

    const now = new Date();
    const currentIndex = hourlyTimes.findIndex((t) =>
      t.startsWith(now.toISOString().slice(0, 13))
    );

    const hourlyContainer = document.querySelector(".forecast-grid.hourly");
    hourlyContainer.innerHTML = "";

    for (let i = currentIndex + 1; i <= currentIndex + 3; i++) {
      const time = hourlyTimes[i].slice(11, 16);
      const temp = hourlyTemps[i];
      const code = hourlyCodes[i];

      hourlyContainer.innerHTML += `
        <div class="forecast-hour">
          <img src="${getIcon(code)}" alt="${description[code] || "Vær"}" />
          <div>${time} – ${temp}°C</div>
        </div>
      `;
    }

    // Next 3 days
    const dailyContainer = document.querySelector(".forecast-grid.daily");
    dailyContainer.innerHTML = "";

    for (let i = 1; i <= 3; i++) {
      const date = new Date(data.daily.time[i]);
      const weekday = date.toLocaleDateString("no-NO", { weekday: "short" });
      const max = data.daily.temperature_2m_max[i];
      const min = data.daily.temperature_2m_min[i];
      const code = data.daily.weathercode[i];

      dailyContainer.innerHTML += `
        <div class="forecast-day">
          <img src="${getIcon(code)}" alt="${description[code] || "Vær"}" />
          <div>${weekday} – Max ${max}° / Min ${min}°</div>
        </div>
      `;
    }
  });
