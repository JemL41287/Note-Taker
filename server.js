const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let n = 0;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});


app.listen(PORT, function() {
    console.log(`App listening on port ${PORT}`);
});