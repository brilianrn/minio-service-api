if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 7000;
const router = require("./src/routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

app.use(router);

app.listen(port, () => {
  console.log(`Minio service running on http://localhost:${port}`);
});
