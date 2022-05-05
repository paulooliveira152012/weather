//apiKey = 07bc796881be5c58857101bc6401fe30

//reference to html button element
var button = document.querySelector("#searchBtn")
//reference to the search input
var input = document.querySelector("#searchInput")

button.addEventListener("click", function(event){
    event.preventDefault()
    convertCityName(input.value)
})

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
function convertCityName(cityName) {
    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=07bc796881be5c58857101bc6401fe30`
    fetch(apiUrl)
    .then(function (response){
        response.json()
        .then(function(data){
            getWheather(data[0].lat, data[0].lon)
        })
    })
}

//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

var temp = document.querySelector("#temp");
var hum = document.querySelector("#hum");
var wind = document.querySelector("#wind")
var uvi = document.querySelector("#uvi")

//fetch cities
var getWheather = function(lat, lon) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=07bc796881be5c58857101bc6401fe30`;
    //make a get request to url
    fetch(apiUrl)
    .then(function(response) {
        response.json()
        .then(function(data){
            console.log(data)
            temp.textContent = "Temp: " + data.current.temp
            hum.textContent = "Humidity: " + data.current.humidity
            wind.textContent = "Wind Speed: " + data.current.wind_speed
            uvi.textContent = "uvi: " + data.current.uvi
        })
    })
}



// getWheather()


/*

fetch(URL_with_city_name)
.then(res => res.json())
.then(data => {
  var lat = data.whatever.the.docs.say.where.lat.is;
  var lon = data.whatever.the.docs.say.where.lon.is;

  //process data result for current weather  

  fetch(URL_with_lat_and_lon)
  .then(res => res.json())
  .then(data => {
       // process data results for multiple day forecast
   })
})

*/
