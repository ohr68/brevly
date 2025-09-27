import { randomUUID } from 'node:crypto'
import type { InferInsertModel } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export async function makeUrl(
  overrides?: Partial<InferInsertModel<typeof schema.urls>>
) {
  const originalUrl = `https://site-${randomUUID()}.com`
  const shortenedUrl = `http:localhost:3333/${randomUUID()}`

  const result = await db
    .insert(schema.urls)
    .values({
      originalUrl,
      shortenedUrl,
      ...overrides,
    })
    .returning()

  return result[0]
}
