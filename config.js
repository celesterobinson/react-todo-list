require("dotenv").config();

module.exports = {
    port: process.env.PORT,
    db: "mongodb://localhost:27017/todo"
}