const note = require("express").Router();
const { notEqual } = require("assert");
// const express = reqire('express');
const fs = require("fs").promises;

async function getFile(note) {
    const data = await fs.readFile("./db/db.json", "binary");
    const json = JSON.parse(Buffer.from(data).toString())
    console.log(Object.getOwnPropertyNames(json));
    json.push(note);
    console.log(json);
//     return Buffer.from(data);
//     const data = await readFile("./db/db.json", function (err, data) {
//         json = JSON.parse(data)
//        console.log(json);
//        json.push(note)
//        fs.writeFile("./db/db.json", JSON.stringify(json), function(err) {
//            if (err) {
//              throw err;
//            }
//          });
//    })
}

note.post("/", (req, res) => {
  const { title, text } = req.body;
  console.log(req.body);
  if (!title || !text) {
    return res.statusCode(400).json({ msg: "Enter a title/Text" });
  }
  const note = {
    title,
    text
  };
  try {
    let json;
    getFile(note);
  }
   catch (err) {
    console.log(err);
    res.status(500);
  }
  res.sendStatus(200);
});

module.exports = note;

// const fb = require('express').Router();
// const { v4: uuidv4 } = require('uuid');
// const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// // GET Route for retrieving all the feedback
// fb.get('/', (req, res) =>
//   readFromFile('./db/feedback.json').then((data) => res.json(JSON.parse(data)))
// );

// // POST Route for submitting feedback
// fb.post('/', (req, res) => {
//   // Destructuring assignment for the items in req.body
//   const { email, feedbackType, feedback } = req.body;

//   // If all the required properties are present
//   if (email && feedbackType && feedback) {
//     // Variable for the object we will save
//     const newFeedback = {
//       email,
//       feedbackType,
//       feedback,
//       feedback_id: uuidv4(),
//     };

//     readAndAppend(newFeedback, './db/feedback.json');

//     const response = {
//       status: 'success',
//       body: newFeedback,
//     };

//     res.json(response);
//   } else {
//     res.json('Error in posting feedback');
//   }
// });

// module.exports = fb;
