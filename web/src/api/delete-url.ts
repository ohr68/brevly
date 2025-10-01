import { api } from '@/lib/axios'

export interface DeleteUrlParams {
  shortenedUrl: string
}

export interface DeleteUrlOutput {
  id: string
}

export async function deleteUrl (
  {
    shortenedUrl
  } : DeleteUrlParams) : Promise<DeleteUrlOutput> {
  const result = await api.delete<DeleteUrlOutput>(`/url/${shortenedUrl}`)

  return result.data
}
