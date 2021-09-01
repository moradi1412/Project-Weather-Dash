var getCurrentWeather = function () {

    

    fetch("https://api.openweathermap.org/data/2.5/weather?q=Sacramento&appid=fd0ea7baffebc408619b7fb5206660c9")
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                });
            } else {
                alert('Error: GitHub User Not Found');
            }
        })
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to GitHub");
        });
};

getCurrentWeather();

var displayCurrent = function (){ 

}