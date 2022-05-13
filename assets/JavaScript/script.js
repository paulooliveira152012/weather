//apiKey = 07bc796881be5c58857101bc6401fe30

//reference to html button element
var button = document.querySelector("#searchBtn");
//reference to the search input
var input = document.querySelector("#searchInput");
//reference to the h3 at top container
var title = document.querySelector("#cityName");
//reference to fiveDay container
var fiveDay = document.querySelector("#fiveDay");
//reference to cards container
var cardsContainer = document.querySelector("#cardsContainer");
//reference to search history
var searchHistory = document.querySelector("#searchHistory");

button.addEventListener("click", function (event) {
  event.preventDefault();
  convertCityName(input.value);
  //check if city name result is ok, if so, populate h3 with city name
  //populating h3 value
  title.innerHTML = input.value;
  //call five day forcast to populate bottom container
  // fiveDayForecast()
  localStorage();
  //clearing search bar
  input.value = " "
});

/* ----------------------------------------------------------- */
// CONVERTING LAT AND LON VALUES TO NAME

function convertCityName(cityName) {
  var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=07bc796881be5c58857101bc6401fe30`;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getWheather(data[0].lat, data[0].lon);
    });
}
/* ----------------------------------------------------------- */

/* ----------------------------------------------------------- */
// GETTING THE DATA FOR THAT CITY
// http://openweathermap.org/img/wn/10d@2x.png
// creating variables referencing to the elements where information will be displayed
var temp = document.querySelector("#temp");
var hum = document.querySelector("#hum");
var wind = document.querySelector("#wind");
var uvi = document.querySelector("#uvi");
var icon = document.querySelector(".icon");
var date = document.querySelector("#date");

//fetch cities
var getWheather = function (lat, lon) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=07bc796881be5c58857101bc6401fe30`;
  //make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Trying to loop through the array
      console.log(data.daily[1]);
      date.textContent = moment().format("MMM Do YY");
      temp.textContent = "Temperature: " + data.daily[0].temp.day + "F";
      hum.textContent = "Humidity: " + data.daily[0].humidity;
      wind.textContent = "Wind Speed: " + data.daily[0].wind_speed;
      uvi.textContent = "uvi: " + data.daily[0].uvi;
      icon.setAttribute(
        "src",
        ` http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}.png`
      );
      for (let i = 1; i < 6; i++) {
        //dinamically creating new divs for 5 day forcast
        var newDiv = document.createElement("div");
        newDiv.style.height = "125px";
        newDiv.style.width = "100px";
        newDiv.style.backgroundColor = "lightBlue";
        newDiv.style.padding = "5px";
        newDiv.style.margin = "5px";
        //appending to cardsContainer
        cardsContainer.appendChild(newDiv);
        var cardImg = document.createElement("img");
        cardImg.setAttribute(
          "src",
          ` http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`
        );
        newDiv.appendChild(cardImg);

        var cardTemp = document.createElement("h5");
        cardTemp.textContent = "Temp: " + data.daily[i].temp.day;
        newDiv.appendChild(cardTemp);
        var cardHumidity = document.createElement("h5");
        cardHumidity.textContent = "Hum: " + data.daily[i].humidity;
        newDiv.appendChild(cardHumidity);
        var cardWind = document.createElement("h5");
        cardWind.textContent = "Wind " + data.daily[i].wind_speed;
        newDiv.appendChild(cardWind);

        var forecastDay = moment.unix(data.daily[i].dt).format("MMM DD YY");
        console.log(forecastDay);

        var cardDate = document.createElement("h5");
        cardDate.textContent = "Date " + forecastDay;
        newDiv.appendChild(cardDate);
      }
    });
};
/* ----------------------------------------------------------- */

/* ----------------------------------------------------------- */
console.log(moment().format());

// append city history to ul id(#searchHistory)
function localStorage() {
  // create element as a variable
  var citySearched = document.createElement("h5");
  // setting text content euqal to search input value
  citySearched.textContent = input.value;
  // appending to the searchHistory section
  searchHistory.appendChild(citySearched);  
}

//setting the citySearched to local storage
  //persisting search history 
  //empty out #fiveDay container after button is clicked before new content appear 
