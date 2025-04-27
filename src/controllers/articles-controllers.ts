import { NextFunction, Request, Response } from "express";
import { fetchArticles } from "../models/articles-models";
import { Article } from "../interfaces";

export const getArticles = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const articles: Article[] = await fetchArticles();
    res.status(200).send({articles})
}