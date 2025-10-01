import { api } from '@/lib/axios'

export interface IncrementAccessCountParams {
  shortenedUrl: string
}

export async function incrementAccessCount ({ shortenedUrl } : IncrementAccessCountParams) {
  await api.patch(`/url/${shortenedUrl}`)
}
