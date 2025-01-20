const express = require("express");
const app = express();
const port = 3000;

const containerName = process.env.CONTAINER_NAME || "Unknown Container";

app.get("/", (req, res) => {
	res.send(`Hello World from ${containerName}!`);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
