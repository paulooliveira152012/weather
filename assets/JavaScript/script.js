//apiKey = 07bc796881be5c58857101bc6401fe30

const button = document.querySelector("#searchBtn");
const input = document.querySelector("#searchInput");
const title = document.querySelector("#cityName");
const fiveDay = document.querySelector("#fiveDay");
const cardsContainer = document.querySelector("#cardsContainer");
var historyEl = document.querySelector("#historyEl");
const searchHistory = [];
const newSearch = input.value;
const historyTitle = document.querySelector("#searchedCities");
const clearBtn = document.querySelector("#clear-btn");
const searchedSection = document.querySelector("#cities");
const titleBottom = document.querySelector("#title")
const topContainer = document.querySelector("#top")


button.addEventListener("click", function (event) {  
  event.preventDefault();
  if(input.value == "") {
    console.log("blank")
  } else {convertCityName(input.value)}
});

function convertCityName(cityName) {
  var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=07bc796881be5c58857101bc6401fe30`;
  title.innerHTML = input.value;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getWeather(data[0].lat, data[0].lon);
      topContainer.style.display= "block";
      addTitle()
      searchHistory.push({city: input.value})
      console.log(searchHistory)
      for(var i = 0; i < searchHistory.length; i++) {
      localStorage.setItem(i, JSON.stringify(searchHistory[i]));
      }
      displayFromLocalStorage();
    })
    .catch(error => {
      topContainer.style.display = "none";
      titleBottom.display = "none";
      fiveDay.innerHTML="";
      window.alert("City not Found");
      throw(error);
    });
}

function addTitle() {
    fiveDay.innerHTML="";
    const fiveDayTitle = document.createElement("h2");
    fiveDayTitle.innerHTML = "5-day Forcast";
    fiveDay.appendChild(fiveDayTitle);
}


// creating variables referencing to the elements where information will be displayed
var temp = document.querySelector("#temp");
var hum = document.querySelector("#hum");
var wind = document.querySelector("#wind");
var uvi = document.querySelector("#uvi");
var icon = document.querySelector(".icon");
var date = document.querySelector("#date");

//fetch cities
var getWeather = function (lat, lon) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=07bc796881be5c58857101bc6401fe30`;
  //make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
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
        var newDiv = document.createElement("div");
        newDiv.style.height = "auto";
        newDiv.style.width = "auto";
        newDiv.style.borderRadius = "5px";
        newDiv.style.padding = "5px";
        newDiv.style.margin = "5px";
        newDiv.style.backgroundColor = "#037CFF";
        newDiv.style.color="white";
        newDiv.classList.add("container")
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
        var cardDate = document.createElement("h5");
        cardDate.textContent = "Date " + forecastDay;
        newDiv.appendChild(cardDate);
      }
    });
};
// function to get the names from local storage
function getCities(){
  for(var i = 0; i < localStorage.length; i++) {
    if(localStorage.length > 0) {
      var index = localStorage.key(i);
      var value = JSON.parse(localStorage.getItem(index));
      displayTitle()
    }

    // searchHistory.push(value);
    displayFromLocalStorage(value.city)
  }
}

function displayFromLocalStorage(city) {
  historyEl.innerHTML = "";
  cardsContainer.innerHTML = "";
  for(let i = 0; i < localStorage.length; i++) { 
    var historyItem = document.createElement("li");
    historyItem.style.listStyle="none";
    historyItem.style.padding = "5px";
    historyItem.style.cursor = "pointer";
    historyItem.classList.add("list");
    historyItem.innerText = localStorage[i];
    historyEl.appendChild(historyItem)
  }
}


//clean search history
clearBtn.addEventListener('click', function() {
  historyEl.innerHTML = "";
  localStorage.clear()
clearBtn.style.display="none";
historyTitle.style.display="none";
})

function displayTitle() {
  //displaying clear button
  if(historyTitle.style.display="none") {
    clearBtn.style.display="block"
  }

  if (searchHistory != "") {
    historyTitle.style.display="block"
  }
}

getCities()