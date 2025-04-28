import { app } from "./app";

//establishing a server connection
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Listening on ${PORT}...`);
	console.log(`view swagger docs at http://localhost:${PORT}/api`)
});
