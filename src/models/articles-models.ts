import format from "pg-format";
import { db } from "../db/db-connection";
import { Article } from "../interfaces";

//a set of functions to interact witht the database

export const fetchArticles = async () => {
	const { rows } = await db.query(
		"SELECT article_id, summary, author, publication_date FROM articles;"
	);
	return rows;
};

export const insertArticle = async (newArticle: Article) => {
	//checking whether a publication date was passed to correctly set the insert columns
	const query = format(
		`INSERT INTO articles (summary, author, body${
			newArticle.publication_date ? ", publication_date" : ""
		}) VALUES (%L) RETURNING *;`,
		Object.values(newArticle)
	);
	const { rows } = await db.query(query);
	return rows[0];
};


export const fetchArticleById = async (articleId: number) => {
	const query = format(`SELECT * FROM articles WHERE article_id = %s`, articleId);
	const { rows } = await db.query(query);
	return rows[0];
};
