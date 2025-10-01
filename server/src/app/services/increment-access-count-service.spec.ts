import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { createShortenedUrl } from './create-shortened-url-service'
import { UrlNotFound } from './errors/url-not-found'
import { incrementAccessCount } from './increment-access-count-service'

describe('increment URL access count', () => {
  it('should be able to increment URL access count', async () => {
    const originalUrl = `https://site-${randomUUID()}.com`
    const shortenedUrlSuffix = randomUUID()

    const createdUrl = await createShortenedUrl({
      originalUrl,
      shortenedUrlSuffix,
    })

    expect(isRight(createdUrl))

    const createdShortenedUrl = createdUrl.right?.shortenedUrl

    expect(createdShortenedUrl).toEqual(shortenedUrlSuffix)

    const sut = await incrementAccessCount({
      shortenedUrlSuffix: createdShortenedUrl ?? '',
    })

    expect(isRight(sut))
    expect(unwrapEither(sut)).toBe(null)
  })

  it('should return URL not found if requested URL not exists', async () => {
    const shortenedUrlSuffix = randomUUID()
    const baseUrl = 'http://localhost:3333'
    const shortenedUrl = `${baseUrl}/${shortenedUrlSuffix}`

    const sut = await incrementAccessCount({ shortenedUrlSuffix: shortenedUrl })

    expect(isLeft(sut))
    expect(unwrapEither(sut)).toBeInstanceOf(UrlNotFound)
  })
})
