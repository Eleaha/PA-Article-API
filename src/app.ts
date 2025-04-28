import express, {
	ErrorRequestHandler,
	Request,
	NextFunction,
	Response,
} from "express";
import cors from "cors";
import { articlesRouter } from "./routes/articles-routes";
import { handleErrors } from "./error-handler";
import { swaggerDocs } from "./swagger";

export const app = express();
app.use(cors());

//automatically parsing incoming data to a json format
app.use(express.json());

//defining route endpoint
app.use("/articles", articlesRouter);
swaggerDocs(app)

//handling 404 errors any unknown paths
app.all("*", (req: Request, res: Response, next: NextFunction) => {
	res.status(404).send({ message: "Path not found" });
});

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
