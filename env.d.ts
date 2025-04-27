declare global {
	namespace NodeJS {
		interface ProcessEnv {
			POSTGRES_DB: string;
			POSTGRES_HOST: string;
			POSTGRES_PASSWORD: string;
			POSTGRES_USER: string;
			POSTGRES_PORT: number;
		}
	}
}

export {};
