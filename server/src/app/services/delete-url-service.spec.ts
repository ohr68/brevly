import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import z from 'zod'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { createShortenedUrl } from './create-shortened-url-service'
import { deletelUrl } from './delete-url-service'
import { UrlNotFound } from './errors/url-not-found'

describe('delete URL', () => {
  it('should be able to delete an existing URL', async () => {
    const originalUrl = `https://site-${randomUUID()}.com`
    const shortenedUrlSuffix = randomUUID()

    const createdUrl = await createShortenedUrl({
      originalUrl,
      shortenedUrlSuffix,
    })

    expect(isRight(createdUrl))
    expect(createdUrl.right?.shortenedUrl).toEqual(shortenedUrlSuffix)

    const sut = await deletelUrl({
      shortenedUrl: createdUrl.right?.shortenedUrl ?? '',
    })

    expect(isRight(sut))

    const id = sut.right?.id
    expect(z.uuid().safeParse(id).success).toBe(true)
  })

  it('should return URL not found if URL not exists', async () => {
    const shortenedUrl = `http://localhost:3333/${randomUUID()}`

    const sut = await deletelUrl({
      shortenedUrl,
    })

    expect(isLeft(sut))
    expect(unwrapEither(sut)).toBeInstanceOf(UrlNotFound)
  })
})
