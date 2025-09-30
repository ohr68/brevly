import { DownloadSimpleIcon } from '@phosphor-icons/react'
import { LinkItem, type Link } from './link-item'

export function LinksList ({ links }: { links: Link[] }) {
  return (
    <div className='w-full lg:w-[36.25rem] bg-[var(--white)] border border-[var(--gray-200)] rounded-xl px-8 py-6 flex flex-col max-h-[70vh]'>
      <div className='flex w-full justify-between items-center mb-2 flex-shrink-0'>
        <h3 className='font-bold text-[var(--gray-600)] text-lg'>Meus links</h3>
        <button
          className='flex items-center bg-[var(--gray-200)] rounded-md px-3 py-2 border border-transparent hover:cursor-pointer hover:enabled:border hover:enabled:border-[var(--blue-base)] disabled:opacity-50 disabled:cursor-not-allowed'
          disabled
        >
          <DownloadSimpleIcon width={16} height={16} className='text-[var(--gray-600)]' />
          <span className='font-semibold text-sm text-[var(--gray-500)] ml-2'>Baixar CSV</span>
        </button>
      </div>

      <hr className='border-t border-[var(--gray-200)] mb-2 flex-shrink-0' />

      <div className='flex-1 overflow-y-auto'>
        {links.map((link, index) => (
          <LinkItem key={index} link={link} />
        ))}
      </div>
    </div>
  )
}
