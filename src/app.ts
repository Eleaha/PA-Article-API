import express, {
	ErrorRequestHandler,
	Request,
	NextFunction,
	Response,
} from "express";
import { apiRouter } from "./routes/api-routes";
import { articlesRouter } from "./routes/articles-routes";
import { handleErrors } from "./error-handler";

export const app = express();

//automatically parsing incoming data to a json format
app.use(express.json());

//defininng route endpoint
app.use("/api", apiRouter);
app.use("/articles", articlesRouter);

//handiling 404 errors any unknown paths
app.all(
	"*",
	(
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		res.status(404).send({message: "Path not found"});
	}
);

//using custom error handling middleware to catch any errors and send the correct response accordingly
app.use(
	(
		err: ErrorRequestHandler,
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		handleErrors(err, req, res, next);
	}
);
