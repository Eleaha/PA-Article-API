import { db } from "../db/db-connection";

export const fetchArticles = async () => {
	const { rows } = await db.query(
		"SELECT article_id, summary, author, publication_date FROM articles;"
	);
	return rows;
};
