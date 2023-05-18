const express = require("express");
const route = express.Router();
const filesRoute = require("./files.route");

route.use("/api/v1", route);
route.use("/files", filesRoute);

route.get("/", (_, res) => {
  res.status(200).json({
    status: 200,
    message: "Minio Service",
    data: null,
  });
});

route.use("/*", (_, res) => {
  res.status(404).json({
    status: 404,
    message: "Route is not found",
    data: null,
  });
});

module.exports = route;
