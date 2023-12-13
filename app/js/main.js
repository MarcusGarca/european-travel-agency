import { getCityData } from "./api.serivce.js";
import {
  weekDayTransform,
  monthNameTransform,
  monthDayTransform,
} from "./date.pipe.js";

import {
  ScaleCelciusForFahrenheit,
  ScaleFahrenheitForCelcius,
} from "./temperature.pipe.js";

// Função para carregar e processar os dados do arquivo CSV
// Function to load and process CSV file data
async function loadCityData() {
  try {
    const path = "../city_coordinates.csv";
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.text();
    const lines = data.split("\n");

    const output = [];

    lines.forEach((line) => {
      const fields = line.split(",");
      output.push(fields);
    });

    //console.log(output);

    const citySelect = document.getElementById("city");

    output.slice(1).forEach((cityInfo) => {
      const latitude = cityInfo[0];
      const longitude = cityInfo[1];
      const cityName = cityInfo[2];
      const country = cityInfo[3];

      const optionText = `${cityName} | ${country}`;

      const option = document.createElement("option");
      option.value = `${latitude},${longitude}`;
      option.textContent = optionText;
      citySelect.appendChild(option);
    });
  } catch (err) {
    console.log("Erro de leitura ", err);
  }
}

// Chamar a função no window.onload
// Call the function in window.onload
window.onload = () => {
  loadCityData();
};

//Atualiza as condições climaticas da cidade selecionada
//Updates selected city weather conditions
window.selectCity = async function () {
  const divSpinner = document.querySelector(".container-spinner");
  const cityWeatherElement = document.querySelector(".city-weather");

  divSpinner.style.display = "inline-block";
  cityWeatherElement.style.display = "none";

  const citySelect = document.getElementById("city");
  let allValues = citySelect.value;
  let pathValues = allValues.split(",");
  let latitude = pathValues[0];
  let longitude = pathValues[1];

  try {
    const data = await getCityData(latitude, longitude);
    let dataseries = data.dataseries;

    divSpinner.style.display = "none";
    cityWeatherElement.style.display = "flex";

    cityWeatherElement.innerHTML = "";

    for (let i = 0; i < dataseries.length; i++) {
      const divElement = document.createElement("div");
      divElement.classList.add("city-weather-day");

      const headerElement = document.createElement("header");
      headerElement.textContent =
        weekDayTransform(dataseries[i].date) +
        " " +
        monthNameTransform(dataseries[i].date) +
        " " +
        monthDayTransform(dataseries[i].date);

      headerElement.style.color = getColorWeekDay(i);

      divElement.appendChild(headerElement);

      const imgElement = document.createElement("img");
      imgElement.src = "app/images/" + dataseries[i].weather + ".png";
      divElement.appendChild(imgElement);

      const strongElement = document.createElement("strong");
      strongElement.textContent = dataseries[i].weather;
      divElement.appendChild(strongElement);

      const s1Element = document.createElement("span");
      s1Element.textContent = "High:";
      divElement.appendChild(s1Element);

      const p1Element = document.createElement("p");
      p1Element.textContent = dataseries[i].temp2m.max + "ºC";
      s1Element.appendChild(p1Element);

      const s2Element = document.createElement("span");
      s2Element.textContent = "Low:";
      divElement.appendChild(s2Element);

      const p2Element = document.createElement("p");
      p2Element.textContent = dataseries[i].temp2m.min + "ºC";
      s2Element.appendChild(p2Element);

      cityWeatherElement.appendChild(divElement);
    }
  } catch (error) {
    console.error("Erro ao obter dados da cidade:", error);

    divSpinner.style.display = "none";
    cityWeatherElement.innerHTML = "<p>Error getting city data.</p>";
  }
};

window.getColorWeekDay = function (params) {
  switch (params) {
    case 0:
      return "#EE82EE";

    case 1:
      return "#DC143C";

    case 2:
      return "#FF4500";

    case 3:
      return "#FFD700";

    case 4:
      return "#228B22";

    case 5:
      return "#191970";

    case 6:
      return "#4B0082";
  }
};

window.changeFahrenheit = function () {
  const celciusDiv = document.getElementById("celcius-temperature");
  celciusDiv.style.display = "none";
  const fahrenheitDiv = document.getElementById("fahrenheit-temperature");
  fahrenheitDiv.style.display = "flex";

  ScaleCelciusForFahrenheit();
};
window.changeCelcius = function () {
  const celciusDiv = document.getElementById("celcius-temperature");
  celciusDiv.style.display = "flex";
  const fahrenheitDiv = document.getElementById("fahrenheit-temperature");
  fahrenheitDiv.style.display = "none";

  ScaleFahrenheitForCelcius();
};
