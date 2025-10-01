import { desc } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'

type ListUrlsOutput = {
  urls: {
    id: string
    originalUrl: string
    shortenedUrl: string
    accessCount: number
    createdAt: string
  }[]
}

export async function listUrls(): Promise<Either<never, ListUrlsOutput>> {
  const urls = await db
    .select({
      id: schema.urls.id,
      originalUrl: schema.urls.originalUrl,
      shortenedUrl: schema.urls.shortenedUrl,
      accessCount: schema.urls.accessCount,
      createdAt: schema.urls.createdAt,
    })
    .from(schema.urls)
    .orderBy(desc(schema.urls.id))

  return makeRight({
    urls: urls.map(u => ({
      ...u,
      createdAt: u.createdAt.toISOString(),
    })),
  })
}
