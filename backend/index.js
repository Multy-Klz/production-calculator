// Code to connect to MongoDB and start the server
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = 3000;

// Load environment variables
require("dotenv").config();

// Connect to MongoDB
const databaseUrl = require("./config/database").mongoURI;
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Request-With, Content-Type, Accept"
  );
  next();
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use cors middleware and allow all methods
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

const api = require("./routers/api");
app.use("/api", api);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
