//apiKey = 07bc796881be5c58857101bc6401fe30

//reference to html button element
const button = document.querySelector("#searchBtn");
//reference to the search input
const input = document.querySelector("#searchInput");
//reference to the h3 at top container
const title = document.querySelector("#cityName");
//reference to fiveDay container
const fiveDay = document.querySelector("#fiveDay");
//reference to cards container
const cardsContainer = document.querySelector("#cardsContainer");
//reference to save search history
var historyEl = document.querySelector("#historyEl");
//search history
const searchHistory = [];


button.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(input.value)
  convertCityName(input.value);
  title.innerHTML = input.value;
  // const city = input.value
  // console.log(city)
  searchHistory.push({city: input.value})
  // console.log(searchHistory)
  // localStorage.setItem(city, JSON.stringify(input.value))
  
  for(var i = 0; i < searchHistory.length; i++) {
    localStorage.setItem(i, JSON.stringify(searchHistory[i]));
  }
  //clearing search bar
  input.value = " "
});


/* ----------------------------------------------------------- */
// CONVERTING LAT AND LON VALUES TO NAME

function convertCityName(cityName) {
  var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=07bc796881be5c58857101bc6401fe30`;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      getWheather(data[0].lat, data[0].lon);
    });
}

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
      // console.log(data);
      // Trying to loop through the array
      // console.log(data.daily[1]);
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
        // console.log(forecastDay);

        var cardDate = document.createElement("h5");
        cardDate.textContent = "Date " + forecastDay;
        newDiv.appendChild(cardDate);
      }
    });
};
/* ----------------------------------------------------------- */

/* ----------------------------------------------------------- */
// console.log(moment().format());

// function to get the names from local storage
function getCities(){
  for(var i = 0; i < localStorage.length; i++) {
    if(localStorage > 0) {
      var index = localStorage.key(i);
      var value = JSON.parse(localStorage.getItem(index));
    }

    searchHistory.push(value);
    display(value.name)
  }
}

//function to display searched cities
function display(city) {
  // console.log(city)
  var displayCityEl = document.createElement("li");
  displayCityEl.textContent = city;
  historyEl.appendChild(displayCityEl)
}

getCities()