require("dotenv").config({
  path: `.env-${process.env.NODE_ENV || "development"}`,
});

const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 7000;
const router = require("./src/routes");

app.use(cors());
app.use(
  express.urlencoded({
    limit: `${process.env.MAX_FILE_SIZE || 50}mb`,
    extended: true,
  })
);
app.use(express.json({ limit: `${process.env.MAX_FILE_SIZE || 50}mb` }));
app.use(helmet());
app.use(morgan("tiny"));

app.use(router);

app.listen(port, () => {
  console.log(`Minio service running on http://localhost:${port}`);
});
