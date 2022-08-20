const note = require("express").Router();
const { notEqual } = require("assert");
const { json, response } = require("express");
const fs = require("fs");
const fsp = require("fs").promises;
const { request } = require("http");
const { v4: uuidv4 } = require("uuid");

// GET Route for retrieving all the feedback
note.get("/", (req, res) => {
  let json = "";
  fs.readFile("./db/db.json", function (err, data) {
    json = JSON.parse(data);
    res.json(json);
  });
});

//Get Route for retrieving individual note
note.get("/:id", async (req, res) => {
  if (req.params.id) {
    const data = await fsp.readFile("./db/db.json", "binary");
    let notes = JSON.parse(Buffer.from(data));
    var resNote = null;
    notes.forEach(note => {
        if (note.id === req.params.id) {
        resNote = note;
        }
    })
    if (resNote) {
      res.json(resNote);
    } else {
      res.status(404).json({ msg: "Id not found!" });
    }
  } else {
    res.status(400).json({ msg: "Request expects an ID!" });
  }
});

//Post Route for creating a note
note.post("/", (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    res.status(400).json({ msg: "Enter a title/Text" });
  } else {
    const note = {
      id: uuidv4(),
      title,
      text,
    };
    try {
      fs.readFile("./db/db.json", function (err, data) {
        let json = JSON.parse(data);
        json.push(note);
        fs.writeFile("./db/db.json", JSON.stringify(json), function (err) {
          if (err) {
            throw err;
          }
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500);
    }
    res.status(200).send("Success!!!");
  }
});

note.delete('/:id', async (req,res) => {
    if (req.params.id) {
        const data = await fsp.readFile("./db/db.json", "binary");
        let notes = JSON.parse(Buffer.from(data));
        var newNotes = notes.filter(note => note.id !== req.params.id)
        try {
            fs.writeFile("./db/db.json", JSON.stringify(newNotes), function (err) {
                if (err) {
                  throw err;
                }
              });
          } catch (err) {
            console.log(err);
            res.status(500);
          }
          res.status(200).json({msg: "Successfully deleted!!!"});
      } else {
        res.status(400).json({ msg: "Request expects an ID!" });
      }
    });

module.exports = note;
