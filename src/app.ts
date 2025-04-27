import express from "express";
import { apiRouter  } from "./routes/api-routes";
import { articlesRouter } from "./routes/articles-routes";

export const app = express();

app.use(express.json());
app.use("/api", apiRouter)
app.use("/articles", articlesRouter)