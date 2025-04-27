import { db } from "./db-connection";

//functions to reset tables to create a clean database

export const createTable = async () => {
	try {
		await db.query(`DROP TABLE IF EXISTS articles;`);
		await db.query(`CREATE TABLE articles (
            article_id SERIAL PRIMARY KEY,
            summary VARCHAR(200),
            author VARCHAR(50) NOT NULL,
            body TEXT NOT NULL,
			publication_date TIMESTAMPTZ DEFAULT now());`);
	} catch (err) {
		console.log("something went wrong with table creation:", err);
	}
};

export const dropTable = async () => {
	try {
		await db.query(`DROP TABLE IF EXISTS articles;`);
	} catch (err) {
		console.log("something went wrong with table drop:", err);
	}
};
