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


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("movie app  is online");
})