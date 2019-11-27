const request = require('request');
const apiKey = '28af81603ac21f0fe4c75478dad21818';

function currentWeather(req, res) {

    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

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




module.exports = {
    getWeather: currentWeather
};