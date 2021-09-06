//DOM ELEMENT 
var submitButtom = document.getElementById("city-form"); 
var currentTempEL = document.getElementById("temperature"); 
var currentWindSpeed = document.getElementById ("wind-speed"); 
var currentHumidity = document.getElementById ("humidity"); 
var uvIndex = document.getElementById ("uv-index"); 
var foreCastEl = document.getElementById("foreCast"); 


const APIKey = "fd0ea7baffebc408619b7fb5206660c9"; 
 

var getCityName = function (event) {
    event.preventDefault(); 
    var cityName = document.querySelector("#cityname").value; 

    if (cityName) {
        getCurrentWeather(cityName);         
    } else {
        alert ("please enter name of a city")
    } 
}; 
var getCurrentWeather = function (cityName) { 
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&units=imperial&appid=" + APIKey)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayCurrent(data);
                    var lat = data.coord.lat; 
                    var lon = data.coord.lon; 
                    getUvIndex(lat,lon); 
                    fiveDayforecase(lat,lon);
                });
            } else {
                alert('Error: GitHub User Not Found');
            }
        })
        .catch(function (error) {
            alert("Unable to connect to GitHub");
        });
};

var getUvIndex = function (lat, lon) { 
    console.log(lat);
    console.log(lon);
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey )
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var currentUV = data.current.uvi; 
                uvIndex.innerHTML = currentUV; 
            })
        }
    })
}; 

var fiveDayforecase = function (lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=" + APIKey )
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayFive(data); 
            })
        }
    })};


var displayFive = function (data) { 
    console.log(data); 
    for (let i = 0; i < 5 ; i++) {
    var fiveDaysEl = document.createElement("div"); 
    fiveDaysEl.classList = "col-md-2 card"; 

    var Tempture = document.createElement("span"); 
    Tempture.classList = "card-body text center"; 
    Tempture.textContent ="Temperature :  " +  data.daily[i].temp.day + "  F"; 
    fiveDaysEl.appendChild(Tempture);

    var windSpeed = document.createElement("span"); 
    windSpeed.classList = "card-body text center"; 
    windSpeed.textContent ="Wind-Speed :  " +  data.daily[i].wind_speed + "  MPH"; 
    fiveDaysEl.appendChild(windSpeed); 
    

    var Humidity = document.createElement("span"); 
    Humidity.classList = "card-body text center"; 
    Humidity.textContent ="Humidity :  " +  data.daily[i].humidity + "  %"; 
    fiveDaysEl.appendChild(Humidity);
          

    foreCastEl.appendChild(fiveDaysEl);
     
    
   
}
};

submitButtom.addEventListener("submit", getCityName); 

var displayCurrent = function (data){ 
    console.log(data);
    var currentTemp = data.main.temp ;
    var currentHumd = data.main.humidity; 
    var currentWind = data.wind.speed; 
    currentTempEL.innerHTML = currentTemp + " F";
    currentHumidity.innerHTML = currentHumd + " %"; 
    currentWindSpeed.innerHTML = currentWind + " MPH"; 
}