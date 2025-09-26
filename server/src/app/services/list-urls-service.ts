import { desc } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'

type GetUrlsOutput = {
  urls: {
    id: string
    originalUrl: string
    shortenedUrl: string
    accessCount: number
  }[]
}

export async function getUrls(): Promise<Either<never, GetUrlsOutput>> {
  const urls = await db
    .select({
      id: schema.urls.id,
      originalUrl: schema.urls.originalUrl,
      shortenedUrl: schema.urls.shortenedUrl,
      accessCount: schema.urls.accessCount,
    })
    .from(schema.urls)
    .orderBy(desc(schema.urls.id))

  return makeRight({ urls })
}
