declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string;
			TEST_GUILD_ID: string;
			ENVIRONMENT: 'dev' | 'prod' | 'debug';
		}
	}
}

export {};
