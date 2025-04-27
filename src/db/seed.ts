import format from "pg-format";
import { Article } from "../interfaces";
import { createTable, dropTable } from "./reset-table";
import { db } from "./db-connection";
import testData from "../test-data.json";

//a seed script which uses json data to seed the database
export const seedDb = async (testData: Article[]) => {
	try {
		await dropTable();
        await createTable();

		const articleInsertQuery = format(
			`INSERT INTO articles (author, summary, body, publication_date) VALUES %L;`,
			testData.map(Object.values)
		);
		await db.query(articleInsertQuery);
	} catch (err) {
		console.log("seeding went wrong with seeding", err);
	}
};

seedDb(testData);
