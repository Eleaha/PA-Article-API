import request from "supertest";
import { app } from "../app";
import { seedDb } from "../db/seedDb";
import { db } from "../db/db-connection";
import testData from "./test-data.json";
import { Article } from "../interfaces";

//managing database connection and ensuring fresh data for each test
afterAll(async () => {
	await db.end();
});
beforeEach(async () => {
	await seedDb(testData);
});

describe("/articles", () => {
	test("GET 200: serves a list of all articles", async () => {
		const { body } = await request(app).get("/articles").expect(200);
		expect(body.articles).toHaveLength(10);
		body.articles.forEach((article: Article) => {
			expect(article).toEqual({
				article_id: expect.any(Number),
				summary: expect.any(String) || expect.any(null),
				author: expect.any(String),
				publication_date: expect.any(String),
			});
		});
	});
});
