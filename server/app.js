/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const fs = require('fs');

const app = express();

const bodyParser = require('body-parser');

const file = fs.readFileSync('./data.json');
const data = JSON.parse(file);

app.get('/api/tickets', (req, res) => {
  const { searchText } = req.query;
  if (searchText) {
    const filter = data.filter((ticket) => ticket.title.toUpperCase().includes(searchText.toUpperCase()));
    res.send(filter);
  } else {
    res.send(data);
  }
});

app.get('/api/tickets/:ticketid', (req, res) => {
  let flag = true;
  for (const ticket of data) {
    if (ticket.id === req.params.ticketid) {
      res.send(ticket);
      flag = false;
    }
  }
  if (flag) {
    res.send('There is no ticket with the corresponding ID');
  }
});

app.post('/api/tickets/:ticketid/done', (req, res) => {
  let flag = true;
  for (const ticket of data) {
    if (ticket.id === req.params.ticketid) {
      if (!ticket.done) {
        ticket.done = true;
      } else {
        ticket.done = false;
      }
      res.send(ticket);
      flag = false;
    }
  }
  if (flag) {
    res.send('There is no ticket with the corresponding ID');
  }
});

app.post('/api/tickets/:ticketid/hide', (req, res) => {
  let flag = true;
  for (const ticket of data) {
    if (ticket.id === req.params.ticketid) {
      ticket.hide = true;
      res.send(ticket);
      flag = false;
    }
  }
  if (flag) {
    res.send('There is no ticket with the corresponding ID');
  }
});

app.post('/api/tickets/unhide', (req, res) => {
  for (const ticket of data) {
    if (ticket.hide) {
      ticket.hide = false;
    }
  }
  res.send(data);
});

app.use(bodyParser.json());
app.use(express.static('../client/build'));

module.exports = app;
