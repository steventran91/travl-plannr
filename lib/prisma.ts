import { PrismaClient } from '../generated/prisma/client'
// @ts-ignore - pg types may not be resolved immediately
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// Ensure DATABASE_URL is available
const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// Initialize Prisma Client with PostgreSQL adapter
// Prisma v7 requires an adapter for custom output paths
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? (() => {
  const pool = new Pool({ connectionString: databaseUrl })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
})()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma