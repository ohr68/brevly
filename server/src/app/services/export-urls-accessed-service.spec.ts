import { randomUUID } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import * as upload from '@/infra/storage/upload-file-to-storage'
import { isRight, unwrapEither } from '@/shared/either'
import { makeUrl } from '@/test/make-url'
import { exportUrlsAccessed } from './export-urls-accessed-service'

describe('export URLs accessed', () => {
  it('should be able to export accessed URLs', async () => {
    const uploadStub = vi
      .spyOn(upload, 'uploadFileToStorage')
      .mockImplementation(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: 'http://example.com/file.csv',
        }
      })

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

    const sut = await exportUrlsAccessed({
      searchQuery: namePattern,
    })

    // @ts-expect-error
    const generatedCsvStream = uploadStub.mock.calls[0][0].contentStream
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generatedCsvStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      generatedCsvStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      generatedCsvStream.on('error', (err: Error) => {
        reject(err)
      })
    })

    const csvAsArray = csvAsString
      .trim()
      .split('\n')
      .map(row => row.split(','))

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).fileUrl).toBe('http://example.com/file.csv')
    expect(csvAsArray).toEqual([
      ['ID', 'Original URL', 'Shortened URL', 'Access Count', 'Uploaded at'],
      [
        url1.id,
        url1.originalUrl,
        url1.shortenedUrl,
        url1.accessCount.toString(),
        expect.any(String),
      ],
      [
        url2.id,
        url2.originalUrl,
        url2.shortenedUrl,
        url2.accessCount.toString(),
        expect.any(String),
      ],
      [
        url3.id,
        url3.originalUrl,
        url3.shortenedUrl,
        url3.accessCount.toString(),
        expect.any(String),
      ],
      [
        url4.id,
        url4.originalUrl,
        url4.shortenedUrl,
        url4.accessCount.toString(),
        expect.any(String),
      ],
      [
        url5.id,
        url5.originalUrl,
        url5.shortenedUrl,
        url5.accessCount.toString(),
        expect.any(String),
      ],
    ])
  })
})
