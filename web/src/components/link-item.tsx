import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CopyButton } from './ui/copy-button'
import { DeleteButton } from './ui/delete-button'
import { deleteUrl, type DeleteUrlOutput } from '@/api/delete-url'
import { env } from '@/env'

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
      updateUrlOnCache(data)
    }
  })

  function updateUrlOnCache (data: DeleteUrlOutput) {
    const linksListCache = queryClient.getQueriesData<{ urls: LinkItemProps[] }>({
      queryKey: ['urls', 'list'],
    })

    linksListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData(cacheKey, {
        ...cacheData,
        urls: cacheData.urls.filter(url => url.id !== data.id),
      })
    })
  }

  return (
    <div className='flex flex-col border-b border-b-[var(--gray-200)] items-center justify-center mx-2'>
      <div className='flex w-full justify-between py-5'>
        <div className='flex flex-col'>
          <a
            href='#'
            className='text-md font-semibold text-[var(--blue-base)] hover:text-[var(--blue-dark)]'
          >
            {fullShortenedUrl}
          </a>
          <span className='text-sm text-[var(--gray-500)]'>{link.originalUrl}</span>
        </div>

        <div className='flex flex-row items-center'>
          <div className='flex px-5'>
            <span className='text-sm text-[var(--gray-500)]'>{link.accessCount} acessos</span>
          </div>
          <div className='flex gap-2'>
            <CopyButton text={fullShortenedUrl} />
            <DeleteButton
              shortenedUrl={link.shortenedUrl}
              isDeleting={isDeletingUrl}
              onDelete={async (shortenedUrl) => await deleteUrlFn({ shortenedUrl })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
