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

    const sut = await createShortenedUrl({
      originalUrl,
      shortenedUrlSuffix,
    })

    expect(isRight(sut))
    expect(sut.right?.shortenedUrl).toEqual(shortenedUrlSuffix)
  })

  it('should not be able to create an invalid shortened URL', async () => {
    const originalUrl = `https://site-${randomUUID()}.com`
    const shortenedUrlSuffix = `Not-a-valid-url`

    const sut = await createShortenedUrl({
      originalUrl,
      shortenedUrlSuffix,
    })

    expect(isLeft(sut))
    expect(unwrapEither(sut)).toBeInstanceOf(InvalidUrl)
  })

  it('should not be able to create a shortened URL that already exists', async () => {
    const originalUrl = `https://site-${randomUUID()}.com`
    const shortenedUrlSuffix = randomUUID()

    const sut = await createShortenedUrl({
      originalUrl,
      shortenedUrlSuffix,
    })

    expect(isRight(sut))
    expect(sut.right?.shortenedUrl).toEqual(shortenedUrlSuffix)

    const anotherOriginalUrl = `https://another-site-${randomUUID()}.com`

    const secondUrlSut = await createShortenedUrl({
      originalUrl: anotherOriginalUrl,
      shortenedUrlSuffix,
    })

    expect(isLeft(secondUrlSut))
    expect(unwrapEither(secondUrlSut)).toBeInstanceOf(UrlAlreadyExists)
  })
})
