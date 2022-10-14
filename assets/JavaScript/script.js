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
//input value
newSearch = input.value;
//searched cities title
const historyTitle = document.querySelector("#searchedCities");
//clear button
const clearBtn = document.querySelector("#clear-btn");
//searched cities section
const searchedSection = document.querySelector("#cities");
//title section for h2 5 day forcast
const titleBottom = document.querySelector("#title")
//top container
const topContainer = document.querySelector("#top")


button.addEventListener("click", function (event) {

  
  display();
  // addTitle()

  event.preventDefault();
  // console.log(input.value)
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

  display(input.value);
  displayTitle()

  //clearing search bar
  input.value = " "
  //clearing cards
  cardsContainer.innerHTML = "";
});

//adding the h2 for 5day forecast
function addTitle() {
    //clean title section
    fiveDay.innerHTML="";
    const fiveDayTitle = document.createElement("h2");
    fiveDayTitle.innerHTML = "5-day Forcast";
    // fiveDay.appendChild(titleBottom);
    fiveDay.appendChild(fiveDayTitle);
}



/* ----------------------------------------------------------- */

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
      // window.alert("city found!")
      topContainer.style.display= "block";
      addTitle()
      // topContainer.style.display = "none";
      // titleBottom.style.display = "none";
    })
    .catch(error => {
      // window.alert("City not Found");
      topContainer.style.display = "none";
      titleBottom.display = "none";
      // fiveDay.display="none";
      fiveDay.innerHTML="";
      window.alert("City not Found");
      
      throw(error);
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
      
      // Trying to loop through the array
  
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
        newDiv.style.height = "auto";
        newDiv.style.width = "auto";
        // newDiv.style.border = "solid lightGrey";
        newDiv.style.borderRadius = "5px";
        newDiv.style.padding = "5px";
        newDiv.style.margin = "5px";
        newDiv.style.backgroundColor = "#037CFF";
        newDiv.style.color="white";
        newDiv.classList.add("container")

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
        

        var cardDate = document.createElement("h5");
        cardDate.textContent = "Date " + forecastDay;
        newDiv.appendChild(cardDate);
      }
    });
};
/* ----------------------------------------------------------- */

/* ----------------------------------------------------------- */


// function to get the names from local storage
function getCities(){
  for(var i = 0; i < localStorage.length; i++) {
    if(localStorage.length > 0) {
      var index = localStorage.key(i);
      var value = JSON.parse(localStorage.getItem(index));
      displayTitle()
    }

    searchHistory.push(value);
    display(value.city)
  }
}

//function to display searched cities
function display(city) {
  // console.log(city)
  var displayCityEl = document.createElement("li");
  displayCityEl.style.listStyle="none";
  displayCityEl.style.padding = "5px";
  displayCityEl.textContent = city;
  displayCityEl.classList.add("list");
  historyEl.appendChild(displayCityEl);
}


// -------------------------------------------------
// function renderSearchHistory() {
//   historyEl.innerHTML = "";
//   for(let i = 0; i < localStorage.length; i++) {
//     const historyItem = document.createElement("input")
//     historyItem.setAttribute("type", "text");
//     historyItem.setAttribute("readonly", true);
//     historyItem.setAttribute("class", "form-control d-block bg-white");
//     historyItem.setAttribute("value", searchHistory[i]);
//     historyItem.addEventListener("click", function () {
//       convertCityName(historyItem.value);
//             })
//             historyEl.append(historyItem);
//   }
// }

// // renderSearchHistory();
// if (searchHistory.length > 0) {
//   convertCityName(searchHistory[searchHistory.length - 1]);
// }
// -------------------------------------------------



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


