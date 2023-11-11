import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv'

dotenv.config()

export default {
	schema: './src/models/index.ts',
	out: './migrations',
	driver: 'pg',
	dbCredentials: {
        host: process.env.DB_HOST ?? 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT!),
        database: process.env.DB_NAME!,
	},
} satisfies Config;