const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const app = express();

const middleware = [logger("dev"), cors(), express.static("public"), express.urlencoded({ extended: true }), express.json()];
app.use(middleware);

console.clear();

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.post("/", (req, res) => {
	res.json({ data: req.body });
});

app.listen(1000, () => {
	console.log("Server listening port on 1000");
});
