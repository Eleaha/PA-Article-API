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

app.use(express.json());
app.use("/api", apiRouter);
app.use("/articles", articlesRouter);

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
