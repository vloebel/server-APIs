

const openWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q="
const openWeatherOneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?"
// openWeatherForecastAPI is paid only
// const openWeatherForecastAPI = "https://api.openweathermap.org/data/2.5/forecast/daily?q="
const excludeString = "&exclude=minutely,hourly,alerts"
const weatherUnits = "&units=imperial"
// APIkey username vk
const apiKey = "&appid=47cc7111aeaa92ded720903e4f89338c"
const iconURL = "http://openweathermap.org/img/wn/"

var searchCityList = [];
var lastSearch = "TUCSON";
const lastSearchDefault = "TUCSON";


//////////////////////////////////////////
// FUNCTION saveSearchHistory() 
function saveSearchHistory () {
  localStorage.setItem("lastSearch", lastSearch);
  localStorage.setItem("searchCityList", JSON.stringify(searchCityList));
}

//////////////////////////////////////////
// FUNCTION loadSearchHistory()
// retrieves the last city searched
// and the search history from 
// localstorage

function loadSearchHistory() {
  console.log("loading search history....")
  var lastSearch = localStorage.getItem("lastSearch") || lastSearchDefault;
  // if (lastSearch == null) {
  //   lastSearch = lastSearchDefault;
  // } 
  searchCityList = JSON.parse(localStorage.getItem("searchCityList")) || [];
  
}

//////////////////////////////////////////
// FUNCTION updateCityButtons()
// refreshes the search history by
// clearing and appending buttons for each
// city in the searchCityList.
//
function updateCityButtons() {
  var searchHistoryEl = document.getElementById('search-history');
  searchHistoryEl.innerHTML = '';
 
  for (var i = 0; i < searchCityList.length; i++) {
    // console.log(`appending button ${i}: ${searchCityList[i]}`);
    var newButton = document.createElement("button");
    newButton.textContent = searchCityList[i];
    newButton.setAttribute("class", "city-button")
    searchHistoryEl.appendChild(newButton);
  }
}
//////////////////////////////////////////
// FUNCTION addCityName
// -Adds city to search history if not already there. 
// -saves last search in global variable so it
// can be used to update search button text field
//
function addCityName(city) {
  if (!searchCityList.includes(city)) {
    console.log(`adding city ${city}`);
    searchCityList.push(city);
    // console.log(` ${searchCityList}`);
    updateCityButtons();
  }
}
/////////////////////////////////////////////
// FUNCTION displayWeatherData (city)
// Calls openweather api to get lat/long of city
// Calls openweather oneCall api to get weather data
// Updates display with current weather
// --and five day forecast
//
function displayWeatherData(city) {
  lastSearch = city;
  saveSearchHistory ();
  // Get current weather conditions
  // and the lat long of the city
  fetch(
    openWeatherAPI +
    city +
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
      //now we have all our data and can start to display
      console.log(data);
      // var searchCity = document.getElementById('searchcity').value;
      //  selected city
      var displayCityEl = document.getElementById('display-city');
      displayCityEl.textContent = city;
      //  today's date
      var dateTodayEl = document.getElementById("date-today");
      dateTodayEl.textContent = ` (${today}) `;
      //  weather icon
      var cwIconEl = document.getElementById("current-weather-icon");
      cwIconEl.setAttribute("src", `${iconURL}` + `${data.current.weather[0].icon}.png`);
      //  temperature
      var cTempEl = document.getElementById("current-temp");
      cTempEl.textContent = data.current.temp;
      // humidity
      var cHumidityEl = document.getElementById("current-humidity");
      cHumidityEl.textContent = data.current.humidity;
      // wind speed
      var cWindSpeedEl = document.getElementById("current-wind-speed");
      cWindSpeedEl.textContent = data.current.wind_speed;
      // UV Index
      var cUViEl = document.getElementById("current-uvi");
      cUViEl.textContent = data.current.uvi;

      // build the forecast cards

      for (var i = 1; i <= 5; i++) {
        // date
        var new_date = moment(today, "MM-DD-YYYY").add(i, 'days').format("MM-DD-YYYY");
        var cardId = `today-plus-` + `${i}`;
        var cardEl = document.getElementById(cardId);
        var cardTitleEl = cardEl.querySelector(".card-date");
        cardTitleEl.textContent = new_date;
        var cardIconEl = cardEl.querySelector(".card-icon");
        cardIconEl.setAttribute("src", `${iconURL}` + `${data.daily[i].weather[0].icon}.png`);
        var cardTempEl = cardEl.querySelector(".card-temp");
        cardTempEl.textContent = data.daily[i].temp.day;
        var cardHumidityEl = cardEl.querySelector(".card-humidity");
        cardHumidityEl.textContent = data.daily[i].humidity;
      }
    });
  });
}




////////////////////////////////
//       MAIN PROGRAM
////////////////////////////////

let today = moment().format("MM-DD-YYYY")

// get search history from local storage
loadSearchHistory();

// initialize the display with the last
// city searched and add search history
var searchCityEl = document.getElementById('search-city');
updateCityButtons();
searchCityEl.textContent = lastSearch;
displayWeatherData(lastSearch);


// search-button text field event listener
// on click -get city - convert to uppercase
// - add to search history - display weather 
var cityEl = document.getElementById("search-button");
cityEl.addEventListener('click', function () {
  searchCity = document.getElementById('search-city').value;
  searchCity = searchCity.toUpperCase();
  addCityName(searchCity);
  displayWeatherData(searchCity);
});

//search-history list event listener
//on click - get city name from clicked button
//- display weather  
var cityListEl = document.getElementById("search-history");
cityListEl.addEventListener('click', event => {
  var searchCityEl = event.target;
  searchCity = searchCityEl.textContent;
  // searchCity = searchCity.toUpperCase();
  displayWeatherData(searchCity);


});
