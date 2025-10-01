import { api } from '@/lib/axios'

export interface CreateShortenedUrlParams {
  originalUrl: string
  shortenedUrlSuffix: string
}

export interface CreateShortenedUrlOutput {
  id: string
  originalUrl: string
  shortenedUrl: string
  accessCount: number
  createdAt: string
}

export async function createShortenedUrl (
  {
    originalUrl,
    shortenedUrlSuffix
  } : CreateShortenedUrlParams) : Promise<CreateShortenedUrlOutput> {
  const result = await api.post<CreateShortenedUrlOutput>('/url', { originalUrl, shortenedUrlSuffix })

  return result.data
}
