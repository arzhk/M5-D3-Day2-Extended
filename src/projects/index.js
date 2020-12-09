const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const router = express.Router();

const readFileHandler = (filename) => {
  const targetFile = JSON.parse(fs.readFileSync(path.join(__dirname, filename)).toString());
  return targetFile;
};

const writeFileHandler = (writeToFilename, file) => {
  fs.writeFileSync(path.join(__dirname, writeToFilename), JSON.stringify(file));
};

// Get list of projects
router.get("/", (req, res) => {
  res.send(readFileHandler("projects.json"));
});

// Get single project
router.get("/:id", (req, res) => {
  const targetFile = readFileHandler("projects.json");
  const project = targetFile.filter((project) => project._id === req.params.id);
  res.send(project);
});

// Create new project
router.post("/", (req, res) => {
  const targetFile = readFileHandler("projects.json");
  const newProject = req.body;
  newProject._id = uniqid();
  newProject._creationDate = new Date();
  targetFile.push(newProject);
  writeFileHandler("projects.json", targetFile);
  res.status(201).send(readFileHandler("projects.json"));
});

// Edit project data
router.put("/:id", (req, res) => {
  const targetFile = readFileHandler("projects.json");
  const filteredFile = targetFile.filter((project) => project._id !== req.params.id);
  const updatedProject = req.body;
  updatedProject._id = req.params.id;
  filteredFile.push(updatedProject);
  writeFileHandler("projects.json", filteredFile);
  res.send(filteredFile);
});

// Delete student
router.delete("/:id", (req, res) => {
  const targetFile = readFileHandler("projects.json");
  const filteredFile = targetFile.filter((project) => project._id !== req.params.id);
  writeFileHandler("projects.json", filteredFile);
  res.send(filteredFile);
});

module.exports = router;
