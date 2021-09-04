//DOM ELEMENT 
var submitButtom = document.getElementById("city-form"); 
var currentTempEL = document.getElementById("temperature"); 
var currentWindSpeed = document.getElementById ("wind-speed"); 
var currentHumidity = document.getElementById ("humidity"); 
var uvIndex = document.getElementById ("uv-index"); 


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
   
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&units=imperial&appid=fd0ea7baffebc408619b7fb5206660c9")
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayCurrent(data);
                });
            } else {
                alert('Error: GitHub User Not Found');
            }
        })
        .catch(function (error) {
            alert("Unable to connect to GitHub");
        });
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