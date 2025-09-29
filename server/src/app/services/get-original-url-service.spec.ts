import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { createShortenedUrl } from './create-shortened-url-service'
import { UrlNotFound } from './errors/url-not-found'
import { getOriginalUrl } from './get-original-url-service'

describe('get original URL', () => {
  it('should be able to get the original URL', async () => {
    const originalUrl = `https://site-${randomUUID()}.com`
    const shortenedUrlSuffix = randomUUID()
    const baseUrl = 'http://localhost:3333'

    const createdUrl = await createShortenedUrl({
      originalUrl,
      shortenedUrlSuffix,
      baseUrl,
    })

    expect(isRight(createdUrl))
    expect(unwrapEither(createdUrl)).toEqual({
      shortenedUrl: `${baseUrl}/${shortenedUrlSuffix}`,
    })

    const shortenedUrl = createdUrl.right?.shortenedUrl ?? ''
    const sut = await getOriginalUrl({ shortenedUrl })

    expect(isRight(sut))
    expect(unwrapEither(sut)).toEqual({
      originalUrl,
    })
  })

  it('should return URL not found if requested URL not exists', async () => {
    const shortenedUrlSuffix = randomUUID()
    const baseUrl = 'http://localhost:3333'
    const shortenedUrl = `${baseUrl}/${shortenedUrlSuffix}`

    const sut = await getOriginalUrl({ shortenedUrl })

    expect(isLeft(sut))
    expect(unwrapEither(sut)).toBeInstanceOf(UrlNotFound)
  })
})
