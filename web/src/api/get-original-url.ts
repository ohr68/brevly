import { api } from '@/lib/axios'

export interface GetOriginalUrlParams {
  shortenedUrl: string
}

export interface GetOriginalUrlResponse {
  originalUrl: string
}

export async function getOriginalUrl ({ shortenedUrl } : GetOriginalUrlParams) {
  const response = await api.get<GetOriginalUrlResponse>(`/url/original/${shortenedUrl}`)

  return response.data
}
