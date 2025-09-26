import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { findOne } from '@/shared/query-helper'
import { UrlNotFound } from './errors/url-not-found'

const getOriginalUrlInput = z.object({
  shortenedUrl: z.url(),
})

type GetOriginalUrlInput = z.input<typeof getOriginalUrlInput>

type GetOriginalUrlOutput = {
  originalUrl: string
}

export async function getOriginalUrl(
  input: GetOriginalUrlInput
): Promise<Either<UrlNotFound, GetOriginalUrlOutput>> {
  const { shortenedUrl } = getOriginalUrlInput.parse(input)

  const result = await findOne(
    db
      .select({ originalUrl: schema.urls.originalUrl })
      .from(schema.urls)
      .where(eq(schema.urls.shortenedUrl, shortenedUrl))
      .limit(1)
  )

  if (!result) {
    return makeLeft(new UrlNotFound())
  }

  return makeRight({ originalUrl: result.originalUrl })
}
