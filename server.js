const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//HTML ROUTES
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

//API ROUTES
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
});

app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let newNote = req.body;
    let noteID = savedNotes.length.toString();
    newNote.id = noteID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("New Note saved to db.json file. Your note: ", newNote);
    res.json(savedNotes);
});

app.delete("/api/notes/:id", function (req, res) {
    let deleteNote = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let targetID = req.params.id;

    console.log(`Deleting note with ID ${targetID}`);
    for (var i = 0; i < deleteNote.length; i++) {
        if (deleteNote[i].id == targetID) {
            deleteNote.splice(i, 1);
        }
    }
    for (i = 0; i < deleteNote.length; i++) {
        deleteNote[i].id = i;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote), err => {
        if (err) throw err;
        return;
    });
    res.send(req.body);
});


app.listen(PORT, function() {
    console.log(`App listening on port ${PORT}`);
});