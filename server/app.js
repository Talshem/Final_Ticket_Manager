const express = require('express');
const fs = require('fs');
const app = express();

var bodyParser = require('body-parser')

const file = fs.readFileSync('./data.json');
var data = JSON.parse(file);


app.get('/api/tickets', (req, res) => {
res.send(data)
});

app.get('/api/tickets/:id', (req, res) => {
    for(let ticket of data) {
        if(ticket.id === req.params.id) {
            res.send(ticket);
        }
    else {
        res.send('There is no ticket with the corresponding ID');
    }
}})



app.post('/api/tickets/:id/undone', (req, res) => 
{   
    res.send(req.body);
    records.push(req.body);
    fs.writeFile('/records.json', JSON.stringify(records), () => {
    console.log(records)
    });
    res.send()
});

app.post('/api/tickets/:id/done', (req, res) => 
{   
    res.send(req.body);
    records.push(req.body);
    fs.writeFile('/records.json', JSON.stringify(records), () => {
    console.log(records)
    });
    res.send()
});

app.use(bodyParser.json())
app.use(express.static('../client/build'))



module.exports = app;