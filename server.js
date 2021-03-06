require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/index");
const ErrorMiddleware = require("./middlewares/ErrorMiddleware");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(ErrorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server has been started at PORT=${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
