const express = require("express");
const { uploadFile } = require("../controllers/files/upload.controller");
const { uploadFileValidator } = require("../middlewares/files.middleware");
const route = express.Router();

route.post("/upload", uploadFileValidator, uploadFile);

module.exports = route;
