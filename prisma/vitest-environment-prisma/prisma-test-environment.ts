import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest/environments'

// postgresql://docker:docker@localhost:5432/api-solid?schema=public

function generateDatabaseUrl(schema: string) {

  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()

    console.log(generateDatabaseUrl(schema))

    return {
      teardown() {
        console.log('Teardown')
      },
    }
  },
}
