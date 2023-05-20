const express = require("express");
const { uploadFile } = require("../controllers/files/upload.controller");
const {
  uploadFileValidator,
  findAllByCodeValidatior,
} = require("../middlewares/files.middleware");
const {
  findAllReportData,
} = require("../controllers/files/findAll.controller");
const route = express.Router();

route.get("/list-object", findAllByCodeValidatior, findAllReportData);
route.post("/upload", uploadFileValidator, uploadFile);

module.exports = route;
