const express = require('express');
const bodyParser = require('body-parser');
const weatherFunctions = require('./functions/weatherFunctions.js')
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null});
})

app.post('/', weatherFunctions.getWeather)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

