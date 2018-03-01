const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const expressJwt = require("express-jwt");
const config = require("./config");

const app = express();

mongoose.connect(config.db, (err) => {
    if (err) throw err;
    console.log("Good jerb! You connected to the database! :)");
});

app.use(bodyParser.json());
app.use("/api", expressJwt({secret: process.env.SECRET}));
app.use("/api/todo", require("./routes/todo"));
app.use("/auth", require("./routes/auth"));

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});