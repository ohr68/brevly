import { api } from '@/lib/axios'

export interface ListUrlsResponse {
  urls: {
    id: string
    originalUrl: string
    shortenedUrl: string
    accessCount: number
    createdAt: string
  }[]
}

export async function listUrls () {
  const response = await api.get<ListUrlsResponse>('/url')

  return response.data
}
