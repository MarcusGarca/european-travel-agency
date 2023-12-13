export function ScaleCelciusForFahrenheit() {
  let cityWeather = document.querySelector(".city-weather");

  let cityWeatherDays = cityWeather.querySelectorAll(".city-weather-day");

  cityWeatherDays.forEach(function (day) {
    let paragraphs = day.querySelectorAll("p");

    paragraphs.forEach(function (paragraph) {
      paragraph.innerHTML =
        (
          parseInt(paragraph.innerHTML.replace("ºC", "").trim()) * 1.8 +
          32
        ).toFixed(0) + "ºF";
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
        (
          (parseInt(paragraph.innerHTML.replace("ºF", "").trim()) - 32) /
          1.8
        ).toFixed(0) + "ºC";
    });
  });
}
