import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { isRight, unwrapEither } from '@/shared/either'
import { makeUrl } from '@/test/make-url'
import { listUrls } from './list-urls-service'

describe('list URLs', () => {
  it('should be able to list URLs', async () => {
    const namePattern = randomUUID()

    const url1 = await makeUrl({
      shortenedUrl: `http://localhost/${namePattern}-1`,
    })
    const url2 = await makeUrl({
      shortenedUrl: `http://localhost/${namePattern}-2`,
    })
    const url3 = await makeUrl({
      shortenedUrl: `http://localhost/${namePattern}-3`,
    })
    const url4 = await makeUrl({
      shortenedUrl: `http://localhost/${namePattern}-4`,
    })
    const url5 = await makeUrl({
      shortenedUrl: `http://localhost/${namePattern}-5`,
    })

    const sut = await listUrls()

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).urls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: url5.id }),
        expect.objectContaining({ id: url4.id }),
        expect.objectContaining({ id: url3.id }),
        expect.objectContaining({ id: url2.id }),
        expect.objectContaining({ id: url1.id }),
      ])
    )
  })
})
