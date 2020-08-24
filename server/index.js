const app = require('./app');
const port = 8080;

app.get('/data', (req, res) => {
res.send(data)
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));