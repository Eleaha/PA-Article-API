import express, { Router } from "express";
import { getRunningConfirmation } from "../controllers/api-controllers";

export const apiRouter: Router = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get confirmation that API is running
 *     responses:
 *       200:
 *         description: A message confirming the API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
apiRouter.get("/api", getRunningConfirmation);
