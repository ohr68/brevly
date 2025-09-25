import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { findOne } from '@/shared/query-helper'
import { UrlNotFound } from './errors/url-not-found'

const deleteUrlInput = z.object({
  id: z.string(),
})

type DeleteUrlInput = z.input<typeof deleteUrlInput>

type DeleteUrlOutput = {
  id: string
}

export async function getOriginalUrl(
  input: DeleteUrlInput
): Promise<Either<UrlNotFound, DeleteUrlOutput>> {
  const { id } = deleteUrlInput.parse(input)

  const result = await findOne(
    db
      .select({ originalUrl: schema.urls.originalUrl })
      .from(schema.urls)
      .where(eq(schema.urls.id, id))
      .limit(1)
  )

  if (!result) {
    return makeLeft(new UrlNotFound())
  }

  await db.delete(schema.urls).where(eq(schema.urls.id, id))

  return makeRight({ id })
}
