import express, { Router } from "express";
import { getArticles } from "../controllers/articles-controllers";

export const articlesRouter: Router = express.Router();

/**
 * @swagger
* /articles:
*  get:
*    summary: Serves all articles
*    responses:
*      200:
*        description: Successfully retrieved articles
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                type: object
*                properties:
*                  article_id:
*                    type: number
*                  summary:
*                    type: string
*                  author:
*                    type: string
*                  publication_date:
*                    type: string
*/
articlesRouter.get("/", getArticles);
