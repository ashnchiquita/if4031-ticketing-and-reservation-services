import {z} from 'zod'

const envSchema = z.object({
  SERVER_PORT: z
    .string({
      required_error: 'SERVER_PORT is required.',
    })
    .min(1, {
      message: 'SERVER_PORT must be at least 1 character long.',
    })
    .max(255),
  DB_USER: z
    .string({
      required_error: 'DB_USER is required.',
    })
    .min(1, {
      message: 'DB_USER must be at least 1 character long.',
    })
    .max(255),
  DB_PASSWORD: z
    .string({
      required_error: 'DB_PASSWORD is required.',
    })
    .min(1, {
      message: 'DB_PASSWORD must be at least 1 character long.',
    })
    .max(255),
  DB_HOST: z
    .string({
      required_error: 'DB_HOST is required.',
    })
    .min(1, {
      message: 'DB_HOST must be at least 1 character long.',
    })
    .max(255),
  DB_PORT: z
    .string({
      required_error: 'DB_PORT is required.',
    })
    .min(1, {
      message: 'DB_PORT must be at least 1 character long.',
    })
    .max(255),
  DB_NAME: z
    .string({
      required_error: 'DB_NAME is required.',
    })
    .min(1, {
      message: 'DB_NAME must be at least 1 character long.',
    })
    .max(255),
  CLIENT_API_KEY: z
    .string({
      required_error: 'CLIENT_API_KEY is required.',
    })
    .min(1, {
      message: 'CLIENT_API_KEY must be at least 1 character long.',
    })
    .max(255),
  PAYMENT_API_KEY: z
    .string({
      required_error: 'CLIENT_API_KEY is required.',
    })
    .min(1, {
      message: 'CLIENT_API_KEY must be at least 1 character long.',
    })
    .max(255),
  RABBITMQ_URL: z
    .string({
      required_error: 'RABBITMQ_URL is required.',
    })
    .min(1, {
      message: 'RABBITMQ_URL must be at least 1 character long.',
    })
    .max(255),
  CLIENT_QUEUE_NAME: z
    .string({
      required_error: 'CLIENT_QUEUE_NAME is required.',
    })
    .min(1, {
      message: 'CLIENT_QUEUE_NAME must be at least 1 character long.',
    })
    .max(255),
  AWS_ACCESS_KEY: z
    .string({
      required_error: 'AWS_ACCESS_KEY is required.',
    })
    .min(1, {
      message: 'AWS_ACCESS_KEY must be at least 1 character long.',
    })
    .max(255),
  AWS_SECRET_KEY: z
    .string({
      required_error: 'AWS_SECRET_KEY is required.',
    })
    .min(1, {
      message: 'AWS_SECRET_KEY must be at least 1 character long.',
    })
    .max(255),
  S3_BUCKET_NAME: z
    .string({
      required_error: 'S3_BUCKET_NAME is required.',
    })
    .min(1, {
      message: 'S3_BUCKET_NAME must be at least 1 character long.',
    })
    .max(255),
  S3_REGION: z
    .string({
      required_error: 'S3_REGION is required.',
    })
    .min(1, {
      message: 'S3_REGION must be at least 1 character long.',
    })
    .max(255),
  PAYMENT_APP_URL: z
    .string({
      required_error: 'PAYMENT_APP_URL is required.',
    })
    .min(1, {
      message: 'PAYMENT_APP_URL must be at least 1 character long.',
    })
    .max(255),
  PAYMENT_OUTBOUND_API_KEY: z
    .string({
      required_error: 'PAYMENT_OUTBOUND_API_KEY is required.',
    })
    .min(1, {
      message: 'PAYMENT_OUTBOUND_API_KEY must be at least 1 character long.',
    })
    .max(255),
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
  throw new Error(env.error.message)
}

export default env.data
