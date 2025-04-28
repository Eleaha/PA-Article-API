import express, { Router } from "express";
import {
	getArticleById,
	getArticles,
	postArticle,
} from "../controllers/articles-controllers";

export const articlesRouter: Router = express.Router();

//setting up routes for the /articles endpoint

articlesRouter.get("/", getArticles);
articlesRouter.post("/", postArticle);
articlesRouter.get("/:article_id", getArticleById);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Serves all articles
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: Successfully retrieved articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   article_id:
 *                     type: number
 *                   summary:
 *                     type: string
 *                   author:
 *                     type: string
 *                   publication_date:
 *                     type: string
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
 *                 example: 2025-04-27T14:30:00Z
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
 *                   example: 2025-04-27T14:30:00Z
 *
 * /articles/{article_id}:
 *   get:
 *     summary: Retrieve a single article by ID
 *     tags:
 *       - Article
 *     parameters:
 *       - in: path
 *         name: article_id
 *         required: true
 *         description: The unique ID of the article
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 article_id:
 *                   type: integer
 *                   example: 5
 *                 author:
 *                   type: string
 *                   example: Sophia Martinez
 *                 summary:
 *                   type: string
 *                   example: Senate passes sweeping cybersecurity bill following rise in ransomware attacks.
 *                 body:
 *                   type: string
 *                   example: After months of debate, the Senate has passed a major cybersecurity bill aimed at protecting government agencies and private companies from cyberattacks. The legislation mandates stricter reporting standards and increased funding for the Cybersecurity and Infrastructure Security Agency (CISA).
 *                 publication_date:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-04-21T17:20:00.000Z
 */