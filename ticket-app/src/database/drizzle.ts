import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from "../models"
import env from '@/config/env'

const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT ? parseInt(env.DB_PORT) : 5432,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
})

const db = drizzle(pool, {
  schema
})

export default db
