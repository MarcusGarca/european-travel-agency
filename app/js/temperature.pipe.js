export function ScaleCelciusForFahrenheit() {
  let cityWeather = document.querySelector(".city-weather");

  let cityWeatherDays = cityWeather.querySelectorAll(".city-weather-day");

  cityWeatherDays.forEach(function (day) {
    let paragraphs = day.querySelectorAll("p");

    paragraphs.forEach(function (paragraph) {
      paragraph.innerHTML =
        Math.floor(
          (parseInt(paragraph.innerHTML.replace("ºC", "").trim()) * 9) / 5 + 32
        ) + "ºF";
    });
  });
}

export function ScaleFahrenheitForCelcius() {
  let cityWeather = document.querySelector(".city-weather");

  let cityWeatherDays = cityWeather.querySelectorAll(".city-weather-day");

  cityWeatherDays.forEach(function (day) {
    let paragraphs = day.querySelectorAll("p");

    paragraphs.forEach(function (paragraph) {
      paragraph.innerHTML =
        Math.floor(
          ((parseInt(paragraph.innerHTML.replace("ºF", "").trim()) - 32) * 5) /
            9
        ) + "ºC";
    });
  });
}
