import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { createShortenedUrl } from './create-shortened-url-service'
import { InvalidUrl } from './errors/invalid-url'
import { UrlAlreadyExists } from './errors/url-already-exists'

describe('create a shortened URL', () => {
  it('should be able to create a valid shortened URL', async () => {
    const originalUrl = `https://site-${randomUUID()}.com`
    const shortenedUrlSuffix = randomUUID()
    const baseUrl = 'http://localhost:3333'

    const sut = await createShortenedUrl({
      originalUrl,
      shortenedUrlSuffix,
      baseUrl,
    })

    expect(isRight(sut))
    expect(unwrapEither(sut)).toEqual({
      shortenedUrl: `${baseUrl}/${shortenedUrlSuffix}`,
    })
  })

  it('should not be able to create a shortened URL with invalid suffix', async () => {
    const originalUrl = `https://site-${randomUUID()}.com`
    const shortenedUrlSuffix = `/teste ${randomUUID()}`
    const baseUrl = 'http://localhost:3333'

    const sut = await createShortenedUrl({
      originalUrl,
      shortenedUrlSuffix,
      baseUrl,
    })

    expect(isLeft(sut))
    expect(unwrapEither(sut)).toBeInstanceOf(InvalidUrl)
  })

  it('should not be able to create a shortened URL that already exists', async () => {
    const originalUrl = `https://site-${randomUUID()}.com`
    const shortenedUrlSuffix = randomUUID()
    const baseUrl = 'http:localhost:3333'

    const sut = await createShortenedUrl({
      originalUrl,
      shortenedUrlSuffix,
      baseUrl,
    })

    expect(isRight(sut))
    expect(unwrapEither(sut)).toEqual({
      shortenedUrl: `${baseUrl}/${shortenedUrlSuffix}`,
    })

    const anotherOriginalUrl = `https://another-site-${randomUUID()}.com`

    const secondUrlSut = await createShortenedUrl({
      originalUrl: anotherOriginalUrl,
      shortenedUrlSuffix,
      baseUrl,
    })

    expect(isLeft(secondUrlSut))
    expect(unwrapEither(secondUrlSut)).toBeInstanceOf(UrlAlreadyExists)
  })
})
