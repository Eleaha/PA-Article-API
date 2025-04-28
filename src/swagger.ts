import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//defining swagger options
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

//serving the swagger docs at the default endpoint
export const swaggerDocs = (app: Express) => {
	app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};