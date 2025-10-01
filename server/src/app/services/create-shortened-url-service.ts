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
  shortenedUrl: z.url(),
})

type CreateShortenedUrlInput = z.input<typeof createShortenedUrlInput>

type CreateShortenedUrlOutput = {
  id: string
  originalUrl: string
  shortenedUrl: string
  accessCount: number
  createdAt: string
}

export async function createShortenedUrl(
  input: CreateShortenedUrlInput
): Promise<Either<InvalidUrl | UrlAlreadyExists, CreateShortenedUrlOutput>> {
  const result = createShortenedUrlInput.safeParse(input)

  if (!result.success) {
    return makeLeft(new InvalidUrl())
  }

  const { originalUrl, shortenedUrl } = result.data

  const existingShortenedUrl = await findOne(
    db
      .select({
        id: schema.urls.id,
      })
      .from(schema.urls)
      .where(eq(schema.urls.shortenedUrl, shortenedUrl))
  )

  if (existingShortenedUrl) {
    return makeLeft(new UrlAlreadyExists())
  }

  const [createdUrl] = await db
    .insert(schema.urls)
    .values({
      originalUrl,
      shortenedUrl,
    })
    .returning({
      id: schema.urls.id,
      originalUrl: schema.urls.originalUrl,
      shortenedUrl: schema.urls.shortenedUrl,
      accessCount: schema.urls.accessCount,
      createdAt: schema.urls.createdAt,
    })

  return makeRight({
    ...createdUrl,
    createdAt: createdUrl.createdAt.toISOString(),
  })
}
