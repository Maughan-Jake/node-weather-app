const request = require('request');
const apiKey = '28af81603ac21f0fe4c75478dad21818';

function currentWeather(req, res) {
    // Ajax calls to the openweathermap api
    var weatherRequest = new XMLHttpRequest();

    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    if (this.readyState == 4 && this.status == 200) {
        // Stringify
        var apiData = this.response;
        // store to local storage
        localStorage.setItem("userWeather", apiData);
        displayWeather(); // changes the CSS
        console.log("weather is up to date");
    }
    
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', {
                weather: null,
                error: 'Error, please try again'
            });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', {
                    weather: null,
                    error: 'Error, please try again'
                });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}! `;
                weatherText += `The low for today will be ${weather.main.temp_min} degrees with a high of ${weather.main.temp_max}`;
                res.render('index', {
                    weather: weatherText,
                    error: null
                }); //passes parameters for ejs to read
            }
        }
    });
}

  // Example of how Ajax calls work using fetch and returning the Json Data.
  // fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?q=New York&units=imperial&appid=28af81603ac21f0fe4c75478dad21818`
  //   )
  //   .then(res => res.json())
  //   .then(data => console.log(data));
function getWeatherAjax() {
  document
    .getElementById("getWeather")
    .addEventListener("click", () => {
      handleGetWeather();
    });

  async function handleGetWeather() {
    const apiKey = "28af81603ac21f0fe4c75478dad21818";
    const locationEl = document.getElementById("location");
    const weatherDataEl = document.getElementById("weatherData");

    const results = await currentWeather(locationEl.value, apiKey);
    weatherDataEl.innerHTML = results;
  }

  async function currentWeather(city, apiKey) {
    if (city === "") {
      return "Please enter a location!";
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    try {
      const res = await fetch(url);
      const weather = await res.json();
      const temp = weather.main.temp;
      const name = weather.name;
      const minTemp = weather.main.temp_min;
      const maxTemp = weather.main.temp_max;
      return `It's ${temp} degrees in ${name}! The low for today will be ${minTemp} degrees with a high of ${maxTemp}`;
    } catch (err) {
      return "Error, please try again";
    }
  }
}


module.exports = {
    getWeather: currentWeather,
    getWeatherAjax: getWeatherAjax
};