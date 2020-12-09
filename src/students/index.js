const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const router = express.Router();

// Get list of students
router.get("/", (req, res) => {
  const targetFile = fs.readFileSync(path.join(__dirname, "students.json")).toString();
  res.send(JSON.parse(targetFile));
});

// Get single student
router.get("/:id", (req, res) => {
  const targetFile = JSON.parse(fs.readFileSync(path.join(__dirname, "students.json")).toString());
  const student = targetFile.filter((user) => user.ID === req.params.id);
  res.send(student);
});

// Create new student
router.post("/", (req, res) => {
  const targetFile = JSON.parse(fs.readFileSync(path.join(__dirname, "students.json")).toString());
  const newStudent = req.body;
  if (checkDuplicateEmails(newStudent.email)) {
    newStudent._id = uniqid();
    targetFile.push(newStudent);
    fs.writeFileSync(path.join(__dirname, "students.json"), JSON.stringify(targetFile));
    res.status(201).send(targetFile);
  } else {
    console.log("cannot enter duplicate email");
    res.status(400).send("Cannot enter a duplicate email");
  }
});

// Edit student data
router.put("/:id", (req, res) => {
  const targetFile = JSON.parse(fs.readFileSync(path.join(__dirname, "students.json")).toString());
  const filteredFile = targetFile.filter((user) => user._id !== req.params.id);
  const updatedStudent = req.body;
  updatedStudent._id = req.params.id;
  filteredFile.push(updatedStudent);
  fs.writeFileSync(path.join(__dirname, "students.json"), JSON.stringify(filteredFile));
  res.send(filteredFile);
});

// Delete student
router.delete("/:id", (req, res) => {
  const targetFile = JSON.parse(fs.readFileSync(path.join(__dirname, "students.json")).toString());
  const filteredFile = targetFile.filter((user) => user._id !== req.params.id);
  fs.writeFileSync(path.join(__dirname, "students.json"), JSON.stringify(filteredFile));
  res.send(filteredFile);
});

// Email validation

const checkDuplicateEmails = (email) => {
  const targetFile = JSON.parse(fs.readFileSync(path.join(__dirname, "students.json")).toString());
  const filteredFile = targetFile.filter((user) => user.email === email);
  return filteredFile.length === 0;
};

module.exports = router;
