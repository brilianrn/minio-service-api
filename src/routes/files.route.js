const express = require("express");
const { uploadFile } = require("../controllers/files/upload.controller");
const route = express.Router();

route.post("/upload", uploadFile);

module.exports = route;
