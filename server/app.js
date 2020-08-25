const express = require('express');
const fs = require('fs');
const app = express();

var bodyParser = require('body-parser')

const file = fs.readFileSync('./data.json');
var data = JSON.parse(file);


app.get('/api/tickets', (req, res) => {
let filter = [];
let searchText = req.query;
if(searchText.searchText){
for (let ticket of data) {
    if(ticket.title.toUpperCase().includes(searchText.searchText.toUpperCase())){
    filter.push(ticket)
    }
}
res.send(filter)
}
else{
res.send(data)
}
});

app.get('/api/tickets/:ticketid', (req, res) => {
let flag = true;
    for(let ticket of data) {
        if(ticket.id === req.params.ticketid) {
        res.send(ticket);
        flag = false
        }}
if (flag){
res.send('There is no ticket with the corresponding ID');
}
})

app.post('/api/tickets/:ticketid/done', (req, res) => {
let flag = true;
    for(let ticket of data) {
        if(ticket.id === req.params.ticketid) {
            ticket.done = true
            res.send(ticket);
            flag = false
        }
}
if (flag){
res.send('There is no ticket with the corresponding ID');
}
})


app.post('/api/tickets/:ticketid/undone', (req, res) => {
let flag = true;
    for(let ticket of data) {
        if(ticket.id === req.params.ticketid) {
            ticket.done = false
            res.send(ticket);
            flag = false
        }
}
if (flag){
res.send('There is no ticket with the corresponding ID');
}
})


app.use(bodyParser.json())
app.use(express.static('../client/build'))



module.exports = app;