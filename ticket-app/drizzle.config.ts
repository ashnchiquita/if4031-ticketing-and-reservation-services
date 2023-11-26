import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv'
import env from './config/env'

dotenv.config()

export default {
	schema: './src/models/index.ts',
	out: './migrations',
	driver: 'pg',
	dbCredentials: {
        host: env.DB_HOST ?? 'localhost',
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        port: parseInt(env.DB_PORT!),
        database: env.DB_NAME!,
	},
} satisfies Config;