import { CopyIcon, TrashIcon } from '@phosphor-icons/react'

export type Link = {
  shortUrl: string
  originalUrl: string
  accessCount: number
}

export function LinkItem ({ link }: { link: Link }) {
  return (
    <div className='flex flex-col border-b border-b-[var(--gray-200)] items-center justify-center mx-2'>
      <div className='flex w-full justify-between py-5'>
        <div className='flex flex-col'>
          <a
            href='#'
            className='text-md font-semibold text-[var(--blue-base)] hover:font-bold hover:text-[var(--blue-dark)]'
          >
            {link.shortUrl}
          </a>
          <span className='text-sm text-[var(--gray-500)]'>{link.originalUrl}</span>
        </div>

        <div className='flex flex-row items-center'>
          <div className='flex px-5'>
            <span className='text-sm text-[var(--gray-500)]'>{link.accessCount} acessos</span>
          </div>
          <div className='flex gap-2'>
            <button className='flex items-center bg-[var(--gray-200)] rounded-md p-2 border border-transparent hover:enabled:border hover:enabled:border-[var(--blue-base)] hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
              <CopyIcon />
            </button>
            <button className='flex items-center bg-[var(--gray-200)] rounded-md p-2 border border-transparent hover:enabled:border hover:enabled:border-[var(--blue-base)] hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
