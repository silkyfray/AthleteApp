var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

    var url = 'http://results.dublinmarathon.ie/results.php';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    var atheleteTime = "";
    request.post({url: url, form: {search:"1", race: "66", number: "1"}}, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);
            athleteTime = $("#content > table.results_table").children().last().children().last().text();
            console.log("Athelete time: " + athleteTime);
            res.send("<h1>athleteTime</h1>" + athleteTime.toString());
        }
    })

})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;