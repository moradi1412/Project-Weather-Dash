//DOM ELEMENT 
var submitButtom = document.getElementById("city-form"); 
var currentTempEL = document.getElementById("temperature"); 
var currentWindSpeed = document.getElementById ("wind-speed"); 
var currentHumidity = document.getElementById ("humidity"); 
var uvIndex = document.getElementById ("uv-index"); 
var forCastEL = document.getElementById("forcast"); 


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
                var Temp = data.daily[0].temp.day ;
                var Humd = data.daily[0].humidity; 
                var Wind = data.daily[0].wind_speed;  

console.log (data);
              console.log(Temp, Humd, Wind);
              
            


            
      
})
        }
    })};




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