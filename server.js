const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const morgan = require("morgan")

const app = express();

app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "client")));

const covidInfoRoutes = require('./src/covidInfo.routes.js');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.get('/', (req,res) =>{
//     res.send("<h1>Welcome to Covid Information Center</h1>");
// });

//app.use(express.static("/client"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "client/index.html"));
})

app.use('/info', covidInfoRoutes);

//הצעה בלבד
app.get('/newMember', (req, res) => {
    res.sendFile(path.join(__dirname, "client/newMember.html"));
})

const port = process.env.PORT || 5500;
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});