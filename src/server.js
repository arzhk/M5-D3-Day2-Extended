const express = require("express");
const cors = require("cors");
const fs = require("fs");
const studentsRoutes = require("./students");
const projectsRoutes = require("./projects");

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());

server.use("/students", studentsRoutes);
server.use("/projects", projectsRoutes);

server.listen(port, () => {
  console.log("Server is running on port: ", port);
});
