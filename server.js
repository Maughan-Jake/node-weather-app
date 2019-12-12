const express = require('express');
const bodyParser = require('body-parser');
const weatherFunctions = require('./functions/weatherFunctions.js')
const PORT = process.env.PORT || 5000
const app = express()
const path = require('path');

//app.use(express.static('public'));
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null});
})

//server side rendering
app.post('/', weatherFunctions.getWeather)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

