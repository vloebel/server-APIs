

const openWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q="
const openWeatherOneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?"
const excludeString ="&exclude= minutely, hourly, alerts"
const weatherUnits = "&units=imperial"
const apiKey= "&appid=47cc7111aeaa92ded720903e4f89338c"



// ***********************************************
// Weather Forecast from  https://openweathermap.org/guide
// username: vk APIkey: 47cc7111aeaa92ded720903e4f89338c
//
function myFunction() {
  var searchCity = document.getElementById('searchCity').value;
  // Get current weather conditions
  // and the lat long of the indicated city
  fetch(
    openWeatherAPI +
      searchCity +
      weatherUnits +
      apiKey
  )
    .then(function (resp) {
      return resp.json()
    }) 
    .then(function (data){ 
      console.log(data);
      console.log(`temp = ${data.main.temp}`);
      console.log(`humidity = ${data.main.humidity}`);
      console.log(`wind speed = ${data.wind.speed}`);
      var longitude = data.coord.lon;
      var latitude = data.coord.lat;
      // console.log(`uv index = ${data.main.temp}`)
      // get the uv index and other stuff we need
      // from the oneCallAPI
      fetch(openWeatherOneCallAPI +
        "&lat=" + latitude +
        "&lon=" + longitude +
        excludeString +
        apiKey
        )
        .then(function (oneCallData) {
          return oneCallData.json()
        })
        .then(function (ocd) {
          console.log(ocd)
      })
    })
    .catch(function() {
      // catch any errors
    });
  }
  
   
  
  


  // .then(function(res) {
  //   console.log(`second results: ${res}`);
  // .then(function(response) {
  //   console.log(response);
  //  })

  // console.log(`getting forecast for ${searchCity}`);
  // fetch(
  //   `http://api.openweathermap.org/data/2.5/weather?q= 
  //     ${searchCity}
  //     &units=imperial
  //     &appid=47cc7111aeaa92ded720903e4f89338c`
  // )
    // .then(function(response) {
    //   return response.json();
    // })
    // .then(function(response) {
    //   console.log(response.data[0]);
    //   var responseContainerEl = document.querySelector('#response-container');
    //   responseContainerEl.innerHTML = '';
    //   var gifImg = document.createElement('img');
    //   gifImg.setAttribute('src', response.data[0].images.fixed_height.url);
    //   responseContainerEl.appendChild(gifImg);
    // });
 
// }
