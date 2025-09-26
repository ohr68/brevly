import { eq, sql } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { findOne } from '@/shared/query-helper'
import { UrlNotFound } from './errors/url-not-found'

const incrementAccessCountInput = z.object({
  shortenedUrl: z.url(),
})

type IncrementAccessCountInput = z.input<typeof incrementAccessCountInput>

export async function IncrementAccessCount(
  input: IncrementAccessCountInput
): Promise<Either<UrlNotFound, void>> {
  const { shortenedUrl } = incrementAccessCountInput.parse(input)

  const accessedUrl = await findOne(
    db
      .select({
        id: schema.urls.id,
        accessCount: schema.urls.accessCount,
      })
      .from(schema.urls)
      .where(eq(schema.urls.shortenedUrl, shortenedUrl))
  )

  if (!accessedUrl) {
    return makeLeft(new UrlNotFound())
  }

  await db
    .update(schema.urls)
    .set({ accessCount: sql`${schema.urls.accessCount} + 1` })
    .where(eq(schema.urls.shortenedUrl, shortenedUrl))

  return makeRight(undefined)
}
