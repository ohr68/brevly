import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { stringify } from 'csv-stringify'
import { ilike } from 'drizzle-orm'
import z from 'zod'
import { db, pg } from '@/infra/db/'
import { schema } from '@/infra/db/schemas'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { type Either, makeRight } from '@/shared/either'

const exportUrlsAccessedInput = z.object({
  searchQuery: z.string().optional(),
})

type ExportUrlsAccessedInput = z.input<typeof exportUrlsAccessedInput>

type ExportUrlsAccessedOutput = {
  fileUrl: string
}

export async function exportUrlsAccessed(
  input: ExportUrlsAccessedInput
): Promise<Either<never, ExportUrlsAccessedOutput>> {
  const { searchQuery } = exportUrlsAccessedInput.parse(input)

  const { sql, params } = db
    .select({
      id: schema.urls.id,
      originalUrl: schema.urls.originalUrl,
      shortenedUrl: schema.urls.shortenedUrl,
      accessCount: schema.urls.accessCount,
      createdAt: schema.urls.createdAt,
    })
    .from(schema.urls)
    .where(
      searchQuery
        ? ilike(schema.urls.shortenedUrl, `%${searchQuery}%`)
        : undefined
    )
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(2)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'original_url', header: 'Original URL' },
      { key: 'shortened_url', header: 'Shortened URL' },
      { key: 'access_count', header: 'Access Count' },
      { key: 'created_at', header: 'Uploaded at' },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCsvPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks, _encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }

        callback()
      },
    }),
    csv,
    uploadToStorageStream
  )

  const fileName = `${new Date().toISOString()}-accessed-urls.csv`

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    folder: 'downloads',
    fileName,
    contentStream: uploadToStorageStream,
  })

  const [{ key, url }] = await Promise.all([
    uploadToStorage,
    convertToCsvPipeline,
  ])

  await db.insert(schema.exported).values({
    name: fileName,
    remoteKey: key,
    remoteUrl: url,
  })

  return makeRight({ fileUrl: url })
}
