import express from "express";

export const app = express();

app.use(express.json());

console.log("app running");

app.get("/", (req, res) => {
	return res.status(200).send({
		message: "api running",
	});
});
