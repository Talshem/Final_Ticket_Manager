const express = require('express');
const fs = require('fs');
const app = express();

var bodyParser = require('body-parser')

const file = fs.readFileSync('./data.json');
var data = JSON.parse(file);


app.get('/api/tickets', (req, res) => {
res.send(data)
});

app.get('/api/tickets/:ticketid', (req, res) => {
    for(let ticket of data) {
        if(ticket.id === req.params.ticketid) {
            res.send(ticket);
        }
    else {
        res.send('There is no ticket with the corresponding ID');
    }
}})


app.post('/api/tickets/:id/done', (req, res) => {
    for(let ticket of data) {
        if(ticket.id === req.params.id) {
            ticket.done = true
            res.send(ticket);
        }
    else {
        res.send('There is no ticket with the corresponding ID');
    }
}})


app.post('/api/tickets/:id/undone', (req, res) => {
    for(let ticket of data) {
        if(ticket.id === req.params.id) {
            ticket.done = false
            res.send(ticket);
        }
    else {
        res.send('There is no ticket with the corresponding ID');
    }
}})


app.use(bodyParser.json())
app.use(express.static('../client/build'))



module.exports = app;