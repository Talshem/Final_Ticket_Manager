const express = require('express');
const fs = require('fs');
const app = express();

var bodyParser = require('body-parser')

const file = fs.readFileSync('./data.json');
var data = JSON.parse(file);


app.get('/data', (req, res) => {
res.send(data)
});


app.use(bodyParser.json())
app.use(express.static('../client/build'))



module.exports = app;