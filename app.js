var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");


app.get("/", function(req, res){
    request("https://api.jikan.moe/v3/top/anime/1", function(error, response, body) {
        var parsedDataTopAnime = JSON.parse(body);
                res.render("search", {parsedDataTopAnime: parsedDataTopAnime});
    })
    
})

//search for anime
app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "https://api.jikan.moe/v3/search/anime?q=" + query;
    request(url, function(error, response, body){
        var parsedData = JSON.parse(body);
        res.render("results", {parsedData: parsedData})
    })
    
})

//Anime details request and parsing
app.get("/details/:id", function(req, res) {
    var x = req.params.id;
    var url2  = "https://api.jikan.moe/v3/anime/" + x;
    request(url2, function(error, response, body) {
        var parsedData2 = JSON.parse(body);
            res.render("details", {parsedData2: parsedData2});
    })
})
app.get("/scheduled", function(req, res) {
        var d = new Date();
        var day = d.getDay();
        var scheduledAnime = "https://api.jikan.moe/v3/schedule/";
        if (day == 0){
            var dayilyAnime = scheduledAnime + "sunday";
            var day = "sunday"
        }
        else if (day == 1){
            var dayilyAnime = scheduledAnime + "monday";
            var day = "monday"
        }
        else if (day == 2){
            var dayilyAnime = scheduledAnime + "tuesday";
            var day = "tuesday"
        }
        else if (day == 3){
           var dayilyAnime = scheduledAnime + "wednesday";
           var day = "wednesday"
        }
        else if (day == 4){
            var dayilyAnime = scheduledAnime + "thursday";
            var day = "thursday"
        }
        else if (day == 5){
            var dayilyAnime = scheduledAnime + "friday";
            var day = "friday"
        }
        else if (day == 6){
            var dayilyAnime = scheduledAnime + "saturday";
            var day = "saturday"
        }
        console.log(dayilyAnime);
        request(dayilyAnime, function(error, response, body) {
            var parsedDataDailyAnime = JSON.parse(body);
            res.render("scheduledAnime", {parsedDataDailyAnime: parsedDataDailyAnime});
       })
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("movie app  is online");
})