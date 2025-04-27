import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "PA Article API docs",
			version: "1.0.0",
		},
	},
	apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Express) => {
	app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};