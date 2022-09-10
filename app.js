const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.post("/", (req, res) => {
    const apiKey = "552bfaf8eaff78b141ed10671561cf97";
    const lat = req.body.lat;
    const lon = req.body.lon;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKey+"&units="+unit;
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon =  weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
          
            res.write("<h1>The temperature at the location is "+ temp + "degrees celcius.</h1>");
            res.write("<h1>" + weatherDescription + "</h1>");
            res.write("<img src = " + imageUrl +">");
            res.send();
        });
    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});

 