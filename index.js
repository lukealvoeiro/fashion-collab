const express = require("express");
const mongoose = require("mongoose");

const app = express();

console.log("HELLO");

const PORT = process.env.PORT || 5000;
app.listen(PORT);
