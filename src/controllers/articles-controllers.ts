import { NextFunction, Request, Response } from "express";
import {
	fetchArticleById,
	fetchArticles,
	insertArticle,
} from "../models/articles-models";
import { Article } from "../interfaces";

export const getArticles = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const articles: Article[] = await fetchArticles();
	res.status(200).send({ articles });
};

export const postArticle = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const newArticle: Article = req.body;
		const validKeys: string[] = ["summary", "author", "body", "publication_date"];

		for (const key of Object.keys(newArticle)) {
			if (!validKeys.includes(key)) {
				await Promise.reject({ status: 400, message: "Bad request" });
			}
		}
		const insertedArticle = await insertArticle(newArticle);
		return res.status(201).send({ article: insertedArticle });
	} catch (err) {
		return next(err);
	}
};

export const getArticleById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { article_id } = req.params;
		const article: Article = await fetchArticleById(+article_id);

		article
			? res.status(200).send({ article })
			: await Promise.reject({ status: 404, message: "Not found" });
	} catch (err) {
		return next(err);
	}
};
