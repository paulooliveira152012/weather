//reference to html button element
var button = document.querySelector("#searchBtn")
//add click event listener to the button to call function
button.addEventListener("click", searchCity)
//function to be called on the button click
function searchCity() {
    window.alert("hey")
}

//fetch cities
var getWheather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
    //make a get request to url
    fetch(apiUrl)
    .then(function(response) {
        if(response.ok){
            console.log(response)
        } else {
            console.log("error")
        }
    })
}

