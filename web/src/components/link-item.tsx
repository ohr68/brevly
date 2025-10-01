import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CopyButton } from './ui/copy-button'
import { DeleteButton } from './ui/delete-button'
import { deleteUrl, type DeleteUrlOutput } from '@/api/delete-url'
import { env } from '@/env'
import { Link } from 'react-router-dom'
import type { ListUrlsResponse } from '@/api/list-urls'
import { incrementAccessCount } from '@/api/increment-access-count'
import { toast } from 'sonner'

export type LinkItemProps = {
  id: string
  originalUrl: string
  shortenedUrl: string
  accessCount: number
  createdAt: string
}

export function LinkItem ({ link }: { link: LinkItemProps }) {
  const queryClient = useQueryClient()
  const fullShortenedUrl = `${env.VITE_FRONTEND_URL}/${link.shortenedUrl}`

  const { mutateAsync: deleteUrlFn, isPending: isDeletingUrl } = useMutation({
    mutationFn: deleteUrl,
    onSuccess: (data) => {
      deleteUrlOnCache(data)
    }
  })

  const { mutateAsync: incrementAccessCountFn } = useMutation({
    mutationFn: incrementAccessCount,
    onSuccess: (_data, variables: { shortenedUrl: string }) => {
      updateAccessCountOnCache(variables.shortenedUrl)
    }
  })

  function deleteUrlOnCache (data: DeleteUrlOutput) {
    const linksListCache = queryClient.getQueriesData<ListUrlsResponse>({
      queryKey: ['urls', 'list'],
    })

    linksListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<ListUrlsResponse>(cacheKey, {
        ...cacheData,
        urls: cacheData.urls.filter(url => url.id !== data.id),
      })
    })
  }

  function updateAccessCountOnCache (shortenedUrl: string) {
    const linksListCache = queryClient.getQueriesData<ListUrlsResponse>({
      queryKey: ['urls', 'list'],
    })

    linksListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<ListUrlsResponse>(cacheKey, {
        ...cacheData,
        urls: cacheData.urls.map(url =>
          url.shortenedUrl === shortenedUrl
            ? { ...url, accessCount: url.accessCount + 1 }
            : url
        ),
      })
    })
  }

  function handleRedirectClick (
    e: React.MouseEvent<HTMLAnchorElement>,
    shortenedUrl: string,
    incrementAccessCountFn: (params: { shortenedUrl: string }) => Promise<void>
  ) {
    e.preventDefault()
    incrementAccessCountFn({ shortenedUrl })
      .catch(err => {
        toast.error('Falha ao contabilizar acesso',
          {
            description: 'Para mais informações sobre o erro, utlize a aba Console do navegador.'
          })

        console.error('Failed to increment access count', err)
      })
      .finally(() => {
        window.open(`/${shortenedUrl}`, '_blank')
      })
  }

  return (
    <div className='flex flex-col border-b border-b-[var(--gray-200)] items-stretch justify-center mx-2'>
      <div className='flex w-full justify-between py-5 gap-4 flex-wrap'>
        <div className='flex flex-col flex-1 min-w-0'>
          <Link
            onClick={(e) =>
              handleRedirectClick(e, link.shortenedUrl, incrementAccessCountFn)}
            to={`/${link.shortenedUrl}`}
            target='_blank'
            className='text-md font-semibold text-[var(--blue-base)] hover:text-[var(--blue-dark)] truncate'
            title={fullShortenedUrl}
          >
            {fullShortenedUrl}
          </Link>
          <span className='text-sm text-[var(--gray-500)] truncate' title={link.originalUrl}>
            {link.originalUrl}
          </span>
        </div>

        <div className='flex flex-row items-center flex-shrink-0 gap-2'>
          <span className='text-sm text-[var(--gray-500)]'>{link.accessCount} acessos</span>
          <CopyButton text={fullShortenedUrl} />
          <DeleteButton
            shortenedUrl={link.shortenedUrl}
            isDeleting={isDeletingUrl}
            onDelete={async (shortenedUrl) => await deleteUrlFn({ shortenedUrl })}
          />
        </div>
      </div>
    </div>
  )
}
