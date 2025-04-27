import express from "express";
import { apiRouter  } from "./routes/api-routes";

export const app = express();

app.use(express.json());

app.use("/api", apiRouter)