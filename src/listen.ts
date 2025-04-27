import { app } from "./app";
import { swaggerDocs } from "./swagger";

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Listening on ${PORT}...`);
	console.log(`view swagger docs at https://localhost:${PORT}`)
	swaggerDocs(app);
});
