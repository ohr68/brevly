import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { findOne } from '@/shared/query-helper'
import { InvalidUrl } from './errors/invalid-url'
import { UrlAlreadyExists } from './errors/url-already-exists'

const createShortenedUrlInput = z.object({
  originalUrl: z.url(),
  shortenedUrlSuffix: z.string(),
  baseUrl: z.url(),
})

type CreateShortenedUrlInput = z.input<typeof createShortenedUrlInput>

export async function createShortenedUrl(
  input: CreateShortenedUrlInput
): Promise<Either<InvalidUrl | UrlAlreadyExists, { shortenedUrl: string }>> {
  const result = createShortenedUrlInput.safeParse(input)

  if (!result.success) {
    return makeLeft(new InvalidUrl())
  }

  const { originalUrl, shortenedUrlSuffix, baseUrl } = result.data
  const shortenedUrl = `${baseUrl}/${shortenedUrlSuffix}`

  const existingShortenedUrl = await findOne(
    db
      .select({
        id: schema.urls.id,
      })
      .from(schema.urls)
      .where(eq(schema.urls.shortenedUrl, shortenedUrlSuffix))
  )

  if (existingShortenedUrl) {
    return makeLeft(new UrlAlreadyExists())
  }

  await db.insert(schema.urls).values({
    originalUrl,
    shortenedUrl,
  })

  return makeRight({ shortenedUrl })
}
