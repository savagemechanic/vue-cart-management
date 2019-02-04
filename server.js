
var express = require('express');
var serveStatic = require('serve-static');

var json = require(__dirname + "/public/listings.json")

var port = process.env.PORT || 5000;
let app = express();

app.use(serveStatic(__dirname + "/dist"));
app.get('/listingjson', function (req, res) {
    res.send(json)
})

app.listen(port);

console.log('Server Started '+ port);