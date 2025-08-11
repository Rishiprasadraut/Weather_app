// ===== DOM ELEMENTS =====
const tempdp = document.getElementById("temp");
const locationdp = document.getElementById("location");
const windspeed = document.getElementById("speed");
const humiditys = document.getElementById("humidity");
const weathers = document.getElementById("weather");
const inputbox = document.querySelector(".input-box");
const searchbtn = document.querySelector(".search-btn");

// ===== API CONFIG =====
const API_KEY = "d393259e3fadd8fecaa8e59e2ef8e239";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"; // ✅ switched to HTTPS for security

// ===== FETCH WEATHER =====
async function checkWeather(city) {
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
 
  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // ✅ Update UI
    tempdp.textContent = `${data.main.temp}`;
    locationdp.textContent = data.name;
    windspeed.textContent = `${data.wind.speed} Km/H`;
    humiditys.textContent = `${data.main.humidity}%`;
    weathers.textContent = data.weather[0].main;
  } catch (error) {
    alert(error.message);
    console.error("Weather API Error:", error);
  }
}

// ===== EVENT LISTENERS =====
searchbtn.addEventListener("click", () => {
  checkWeather(inputbox.value.trim());
  inputbox.value = "";
});

// Optional: Allow "Enter" key to trigger search
inputbox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(inputbox.value.trim());
    inputbox.value = "";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  checkWeather("Surat");
});
