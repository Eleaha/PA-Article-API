import express, { Router } from "express";
import { getArticles, postArticle } from "../controllers/articles-controllers";

export const articlesRouter: Router = express.Router();

/**
 * @swagger
 * /articles:
 *  get:
 *    summary: Serves all articles
 *    tags:
 *      - Articles
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

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     tags:
 *       - Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - summary
 *               - author
 *               - body
 *             properties:
 *               summary:
 *                 type: string
 *                 example: A short summary of the article
 *               author:
 *                 type: string
 *                 example: Jane Doe
 *               body:
 *                 type: string
 *                 example: Lorem ipsum dolor sit amet, consectetur adipiscing elit...
 *               publication_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025/04/27T14:30:00Z
 *     responses:
 *       201:
 *         description: Article successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 article_id:
 *                   type: integer
 *                   example: 1
 *                 summary:
 *                   type: string
 *                   example: A short summary of the article
 *                 author:
 *                   type: string
 *                   example: Jane Doe
 *                 body:
 *                   type: string
 *                   example: Lorem ipsum dolor sit amet, consectetur adipiscing elit...
 *                 publication_date:
 *                   type: string
 *                   format: date-time
 *                   example: 2025/04/27T14:30:00Z
 */
articlesRouter.post("/", postArticle);
