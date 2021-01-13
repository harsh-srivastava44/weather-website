const weatherForm = document.querySelector("form");
const searchText = document.querySelector("input");
const errorData = document.querySelector("#error-message");
const weatherData = document.querySelector("#weather-data");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  errorData.textContent = "Loading weather data...";
  weatherData.textContent = " ";
  fetch(`/weather?address=${searchText.value}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          errorData.innerHTML = data.error;
        }
        errorData.textContent = data.address;
        weatherData.textContent = data.forecast;
      });
    }
  );
});
