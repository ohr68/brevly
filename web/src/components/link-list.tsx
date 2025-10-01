import { LinkIcon } from '@phosphor-icons/react'
import { LinkItem } from './link-item'
import { useQuery } from '@tanstack/react-query'
import { listUrls } from '@/api/list-urls'
import LoadingSpinner from './ui/loading-spinner'
import { DownloadCsvButton } from './ui/download-button'

export function LinksList () {
  const { data: result, isLoading: isLoadingLinks } = useQuery({
    queryKey: ['urls', 'list'],
    queryFn: () => listUrls(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  return (
    <div className='w-full lg:w-[36.25rem] bg-[var(--white)] border border-[var(--gray-200)] rounded-xl px-8 py-6 flex flex-col max-h-[70vh]'>
      <div className='flex w-full justify-between items-center mb-2 flex-shrink-0'>
        <h3 className='font-bold text-[var(--gray-600)] text-lg'>Meus links</h3>
        <DownloadCsvButton
          disabled={isLoadingLinks || !(result?.urls && result.urls.length > 0)}
        />
      </div>

      <hr className='border-t border-[var(--gray-200)] mb-2 flex-shrink-0' />
      {isLoadingLinks
        ? (
          <LoadingSpinner />
          )
        : result?.urls && result.urls.length > 0
          ? (
            <div className='flex-1 overflow-y-auto'>
              {result.urls.map((link, index) => (
                <LinkItem key={index} link={link} />
              ))}
            </div>
            )
          : (
            <div className='flex flex-col items-center justify-center py-6'>
              <LinkIcon
                width={28}
                height={24}
                className='text-[var(--gray-400)] mb-3'
              />
              <p className='text-xs text-[var(--gray-500)] uppercase'>
                Ainda não existem links cadastrados
              </p>
            </div>
            )}
    </div>
  )
}
