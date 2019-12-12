  // Example of how Ajax calls work using fetch and returning the Json Data.
  // fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?q=New York&units=imperial&appid=28af81603ac21f0fe4c75478dad21818`
  //   )
  //   .then(res => res.json())
  //   .then(data => console.log(data));

  document
    .getElementById("getWeather")
    .addEventListener("click", () => {
      handleGetWeather();
    });

    async function handleGetWeather() {
      const apiKey = "28af81603ac21f0fe4c75478dad21818";
      const locationEl = document.getElementById("location");
      const weatherDataEl = document.getElementById("weatherData");
      const weatherForecastEl = document.getElementById("weatherForecast");
  
      const weatherDataResults = await currentWeather(locationEl.value, apiKey);
      const weatherForecastResults = await weatherForecast(locationEl.value, apiKey);
      weatherDataEl.innerHTML = weatherDataResults;
      weatherForecastEl.innerHTML = weatherForecastResults;
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
      const humidity = weather.main.humidity;
      const windspeed = weather.wind.speed;
      return "<div class='weather-info'>"
        +"<section class='weatherSummary'>"
            +"<h3>"+ name +" Weather Summary</h3>"
            +"<div class='weatherDetails'>"
                +"<div class='detail-box box1'>"
                    +"<p class='label'>Temperature</p>"
                   +" <p class='value'>"+ temp +"&deg;F</p>"
                +"</div>"
                +"<div class='detail-box box''>"
                    +"<p class='label'>Humidity</p>"
                    +"<p class='value'>"+ humidity +"%</p>"
                +"</div>"
                +"<div class='detail-box box3'>"
                    +"<p class='label'>Wind Speed</p>"
                    +"<p class='value'>"+ windspeed +" mph</p>"
                +"</div>"
            +"</div>"
        +"</section>";
      

    } catch (err) {
      return "Error, please try again";
    }
  }

  async function weatherForecast(city, apiKey) {
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&APPID=${apiKey}&units=imperial`;
    try {
      const res = await fetch(forecastUrl);
      const weather = await res.json();
      // Day 1
      const temp1 = weather.list[0].main.temp;
      const temp1Feel = weather.list[0].main.feels_like;
      const temp1Humid = weather.list[0].main.humidity;
      // Day 2
      const temp2 = weather.list[1].main.temp;
      const temp2Feel = weather.list[1].main.feels_like;
      const temp2Humid = weather.list[1].main.humidity;
      // Day 3
      const temp3 = weather.list[2].main.temp;
      const temp3Feel = weather.list[2].main.feels_like;
      const temp3Humid = weather.list[2].main.humidity;
      // Day 4
      const temp4 = weather.list[3].main.temp;
      const temp4Feel = weather.list[3].main.feels_like;
      const temp4Humid = weather.list[3].main.humidity;
      // Day 5
      const temp5 = weather.list[4].main.temp;
      const temp5Feel = weather.list[4].main.feels_like;
      const temp5Humid = weather.list[4].main.humidity;

      return "<section class=`forecast`>"
      +"<h3>Temperature Forecast</h3>"
      +"<table>"
          +"<thead>"
              +"<tr>"
                  +"<th>Day</th>"
                  +"<th>1</th>"
                  +"<th>2</th>"
                  +"<th>3</th>"
                  +"<th>4</th>"
                  +"<th>5</th>"
              +"</tr>"
          +"</thead>"
          +"<tbody>"
              +"<tr>"
                  +"<th>Average Temperature</th>"
                  +"<td><span id='dayTemp0'></span>"+ temp1 +" &deg;F</td>"
                  +"<td><span id='dayTemp1'></span>"+ temp2 +" &deg;F</td>"
                  +"<td><span id='dayTemp2'></span>"+ temp3 +" &deg;F</td>"
                  +"<td><span id='dayTemp3'></span>"+ temp4 +" &deg;F</td>"
                  +"<td><span id='dayTemp4'></span>"+ temp5 +" &deg;F</td>"
              +"</tr>"
              +"<tr>"
                  +"<th>Feels Like</th>"
                  +"<td><span id='dayTemp0'></span>"+ temp1Feel +" &deg;F</td>"
                  +"<td><span id='dayTemp1'></span>"+ temp2Feel +" &deg;F</td>"
                  +"<td><span id='dayTemp2'></span>"+ temp3Feel +" &deg;F</td>"
                  +"<td><span id='dayTemp3'></span>"+ temp4Feel +" &deg;F</td>"
                  +"<td><span id='dayTemp4'></span>"+ temp5Feel +" &deg;F</td>"
              +"</tr>"
              +"<tr>"
                  +"<th>Humidity</th>"
                  +"<td><span id='dayTemp0'></span>"+ temp1Humid +" %</td>"
                  +"<td><span id='dayTemp1'></span>"+ temp2Humid +" %</td>"
                  +"<td><span id='dayTemp2'></span>"+ temp3Humid +" %</td>"
                  +"<td><span id='dayTemp3'></span>"+ temp4Humid +" %</td>"
                  +"<td><span id='dayTemp4'></span>"+ temp5Humid +" %</td>"
              +"</tr>"
          +"</tbody>"
      +"</table>"
  +"</section>";
    } catch (err) {
      return "Error, please try again";
    }
  }
