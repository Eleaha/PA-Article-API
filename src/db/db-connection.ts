import { Pool, PoolConfig } from "pg";
import dotenv from "dotenv"

//configuring env to default file of .env
dotenv.config()
const poolConfig: PoolConfig = {
	database: process.env.POSTGRES_DB,
	host: process.env.POSTGRES_HOST,
	password: process.env.POSTGRES_PASSWORD,
	port: +process.env.POSTGRES_PORT!,
	user: process.env.POSTGRES_USER
};

//throwing an error if connection information is missing
if (!process.env.POSTGRES_DB || !process.env.POSTGRES_HOST || !process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_PORT || !process.env.POSTGRES_USER) {
	throw new Error(".env configuration settings missing");
}

export const db = new Pool(poolConfig);
