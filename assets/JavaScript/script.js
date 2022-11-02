//apiKey = 07bc796881be5c58857101bc6401fe30

const button = document.querySelector("#searchBtn");
const input = document.querySelector("#searchInput");
const title = document.querySelector("#cityName");
const fiveDay = document.querySelector("#fiveDay");
const cardsContainer = document.querySelector("#cardsContainer");
const historyEl = document.querySelector("#historyEl");
let searchHistory = [];
const newSearch = input.value;
const historyTitle = document.querySelector("#searchedCities");
const clearBtn = document.querySelector("#clear-btn");
const searchedSection = document.querySelector("#cities");
const titleBottom = document.querySelector("#title")
const topContainer = document.querySelector("#top")

button.addEventListener("click", function (event) {  
  event.preventDefault();

  if(input.value != null) {
    var flag = false;
      if(searchHistory.length != 0) {
        for(var i = 0; i < searchHistory.length; i++) {
          if(cityName === searchHistory[i]) {
            flag = true;
          }
        }
      } 
      if (!flag) {
        searchHistory.push(input.value);
        var btn = document.createElement('btn');
        btn.textContent = input.value;
        btn.addEventListener("click", function() {
          convertCityName(btn.textContent)
        })
        historyEl.appendChild(btn);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

      }
    convertCityName(input.value);
    
  input.value = null
  cardsContainer.innerHTML = "";
  } else {
    console.log("blank");
  }
});

//adding the h2 for 5day forecast
function addTitle() {
    fiveDay.innerHTML="";
    const fiveDayTitle = document.createElement("h2");
    fiveDayTitle.innerHTML = "5-day Forcast";
    fiveDay.appendChild(fiveDayTitle);
}



/* ----------------------------------------------------------- */

/* ----------------------------------------------------------- */
// CONVERTING LAT AND LON VALUES TO NAME



function convertCityName(cityName) {
  var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=07bc796881be5c58857101bc6401fe30`;
  fetch(apiUrl)
    .then(function (response) {
      console.log(response)
      return response.json();
      
    })
    .then(function (data) {
      // console.log(data);
      getWeather(data[0].lat, data[0].lon);
      // window.alert("city found!")
      topContainer.style.display= "block";
      addTitle()
      title.textContent = cityName
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


    

    // display(cityName);
    displayTitle(input.value)
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
// function getCities(){
//   for(var i = 0; i < localStorage.length; i++) {
//     if(localStorage.length > 0) {
//       var index = localStorage.key(i);
//       var value = JSON.parse(localStorage.getItem(index));
//       displayTitle()
//     }

//     searchHistory.push(value);
//     display(value.city)
//   }
// }

//function to display searched cities
// function display(city) {

//   if (city != null && city != "") {

//     // console.log(city)
//     var displayCityEl = document.createElement("li");
//     displayCityEl.style.listStyle="none";
//     displayCityEl.style.padding = "5px";
//     displayCityEl.style.cursor = "pointer";
//     displayCityEl.textContent = city;
//     displayCityEl.classList.add("list");
//     displayCityEl.addEventListener("click", function() {
//       cardsContainer.innerHTML = "";
//       convertCityName(displayCityEl.innerText);
//       title.innerHTML=displayCityEl.innerText;
//     })
//     historyEl.appendChild(displayCityEl);
//   }
// }



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

function createButtons() {
  var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
  console.log(storedCities)
  if(storedCities != null) {
    searchHistory = storedCities;
  }

  searchHistory.forEach(function(city) {
    var btn = document.createElement('btn');
        btn.textContent = city;
        historyEl.appendChild(btn);
        btn.addEventListener("click", function() {
          convertCityName(btn.textContent)
        })
  })

}

function searchBtnAllow() {
  searchHistory.forEach(function(city){
    city.addEventListener("click", )
  })
}

createButtons()

// getCities()