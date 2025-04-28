import request from "supertest";
import { app } from "../app";
import { seedDb } from "../db/seedDb";
import { db } from "../db/db-connection";
import testData from "./test-data.json";
import { Article } from "../interfaces";

//closing database conenction to avoid random hanging
afterAll(async () => {
	await db.end();
});

//rereeshing the tables and seeding before each test to ensure clean data
beforeEach(async () => {
	await seedDb(testData);
});

//testing for unfound paths
describe("general errors", () => {
	test("404: path not found", async () => {
		const { body } = await request(app).get("/garbage").expect(404)
		expect(body.message).toBe("Path not found")
	})
})

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

	describe("POST /articles", () => {
		test("POST 201: creates an article and serves the newly created article", async () => {
			const payload = {
				summary: "new summary",
				author: "Jane Doe",
				body:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			};
			const { body } = await request(app)
				.post("/articles")
				.send(payload)
				.expect(201);

			expect(body.article).toEqual({
				article_id: 11,
				summary: "new summary",
				author: "Jane Doe",
				body:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
				publication_date: expect.any(String),
			});
		});
		test("POST 400: Invalid payload structure", async () => {
			const payload = {
				summary: "new summary",
				writer: "Jane Doe",
				body:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
			};
			const { body } = await request(app)
				.post("/articles")
				.send(payload)
				.expect(400);
			expect(body.message).toBe("Bad request");
		});
		test("POST 400: Invalid date format", async () => {
			const payload = {
				summary: "new summary",
				author: "Jane Doe",
				body:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
				publication_date: "24/07/2025",
			};
			const { body } = await request(app)
				.post("/articles")
				.send(payload)
				.expect(400);
			expect(body.message).toBe("Bad request");
		});
		test("POST 400: Summary over the character limit", async () => {
			const payload = {
				summary:
					"Lorem ipsum dolor e Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorel Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
				author: "Jane Doe",
				body:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
			};
			const { body } = await request(app)
				.post("/articles")
				.send(payload)
				.expect(400);
			expect(body.message).toBe("Bad request");
		});
		test("POST 400: Author over the character limit", async () => {
			const payload = {
				summary: "Lorem ipsum dolor e Lorem ipsum dolor sit amet",
				author:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
				body:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
			};
			const { body } = await request(app)
				.post("/articles")
				.send(payload)
				.expect(400);
			expect(body.message).toBe("Bad request");
		});
	});

	describe("/articles/:article_id", () => {
		test("GET 200: Serves the article specified in endpoint", async () => {
			const { body } = await request(app).get("/articles/5").expect(200);
			expect(body.article).toEqual({
				article_id: 5,
				author: "Sophia Martinez",
				summary:
					"Senate passes sweeping cybersecurity bill following rise in ransomware attacks.",
				body:
					"After months of debate, the Senate has passed a major cybersecurity bill aimed at protecting government agencies and private companies from cyberattacks. The legislation mandates stricter reporting standards and increased funding for the Cybersecurity and Infrastructure Security Agency (CISA).",
				publication_date: "2025-04-21T17:20:00.000Z",
			});
		});
		test("GET 404: Article not found", async () => {
			const { body } = await request(app).get("/articles/5000").expect(404);
			expect(body.message).toBe("Not found");
		});
		test("GET 400: Invalid article id", async () => {
			const { body } = await request(app).get("/articles/garbage").expect(400);
			expect(body.message).toBe("Bad request");
		});
	});
});
