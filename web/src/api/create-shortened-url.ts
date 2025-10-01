import { api } from '@/lib/axios'

export interface CreateShortenedUrlParams {
  originalUrl: string
  shortenedUrl: string
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
    shortenedUrl
  } : CreateShortenedUrlParams) : Promise<CreateShortenedUrlOutput> {
  const result = await api.post<CreateShortenedUrlOutput>('/url', { originalUrl, shortenedUrl })

  return result.data
}
