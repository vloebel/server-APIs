

const openWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q="
const openWeatherOneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?"
// openWeatherForecastAPI is paid only
// const openWeatherForecastAPI = "https://api.openweathermap.org/data/2.5/forecast/daily?q="
const excludeString = "&exclude=minutely,hourly,alerts"
const weatherUnits = "&units=imperial"
const apiKey = "&appid=47cc7111aeaa92ded720903e4f89338c"
const iconURL = "http://openweathermap.org/img/wn/"

// ***********************************************
// APIkey username vk
// ***********************************************
function getWeatherData() { 
  var searchCity = document.getElementById('searchCity').value;
  // Get current weather conditions
  // and the lat long of the indicated city

  fetch(
    openWeatherAPI +
    searchCity +
    weatherUnits +
    apiKey

  ).then(function (resp) { 
    return resp.json();

  }).then(function (data) { 
    // extract longitude and latitude from first call
    var longitude = data.coord.lon;
    var latitude = data.coord.lat;
    // then use OneCallAPI for everything else
    fetch(openWeatherOneCallAPI +
      "&lat=" + latitude +
      "&lon=" + longitude +
      weatherUnits +
      excludeString +
      apiKey

    ).then(function (resp2) {
      return resp2.json();

    }).then(function (data) {
      console.log(`today`);
      // get the bits we want
      console.log(`temp = ${data.current.temp}`);
      console.log(`humidity = ${data.current.humidity}`);
      console.log(`UV Index = ${data.current.uvi}`);
      console.log(`wind speed = ${data.current.wind_speed}`);

      // get the forecast
      console.log(`5-DAY FORECAST`);
      for (var i = 1; i < 5; i++) { 
        console.log(`forecast day ${i}:`);
        console.log(`clouds ${data.daily[i].clouds}:`);
        console.log(`temp ${data.daily[i].temp.day}:`);
        console.log(`humidity ${data.daily[i].humidity}:`);
      }
    });
  });
}

