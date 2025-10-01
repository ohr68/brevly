import { api } from '@/lib/axios'

export interface ExportUrlsAccessedParams {
  searchQuery?: string
}

export interface ExportUrlsAccessedResponse {
  fileUrl: string
}

export async function exportUrlsAccessed (params?: ExportUrlsAccessedParams) {
  const result = await api.get<ExportUrlsAccessedResponse>(
    '/url/exports',
    {
      params: {
        searchQuery: params?.searchQuery ?? undefined,
      },
    }
  )

  return result.data
}
