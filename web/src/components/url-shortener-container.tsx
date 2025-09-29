import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react'
import logo from '../assets/Logo.svg'

export function UrlShortenerContainer () {
  return (
    <div className='flex flex-col px-10'>
      <div className='flex w-full justify-start py-6'>
        <img src={logo} height={24} width={97} />
      </div>
      <div className='flex flex-row gap-5'>
        <div className='w-[23.75rem] bg-[var(--white)] border-2 border-[var(--gray-200)] rounded-xl px-10 py-5'>
          <div className='flex w-full py-2 justify-start'>
            <h3 className='font-bold text-lg'>Novo link</h3>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col py-3'>
              <label htmlFor='original' className='text-xs text-[var(--gray-500)] uppercase py-2'>Link Original</label>
              <input
                type='text'
                id='original'
                className='border-1 text-[var(--gray-500)] border-[var(--gray-200)] rounded-md py-2 pl-3'
                placeholder='www.exemplo.com.br'
              />
            </div>
            <div className='flex flex-col py-3'>
              <label htmlFor='shortened' className='text-xs text-[var(--gray-500)] uppercase py-2'>Link Encurtado</label>
              <div className='flex items-center border border-[var(--gray-200)] rounded-md overflow-hidden'>
                <span className='pl-3 text-[var(--gray-400)]'>
                  brev.ly/
                </span>

                <input
                  type='text'
                  id='shortened'
                  className='flex-1 py-2 text-[var(--gray-700)] placeholder-[var(--gray-400)] focus:outline-none'
                />
              </div>

            </div>
          </div>
          <div className='flex py-3'>
            <button
              className='flex w-full bg-[var(--blue-base)] rounded-md justify-center text-white text-md py-3
                hover:not-[disabled]::bg-[var(--blue-dark)]
                hover:cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed' disabled
            >
              Salvar link
            </button>
          </div>
        </div>
        <div className='w-[36.25rem] bg-[var(--white)] border-2 border-[var(--gray-200)] rounded-xl px-5 py-3 max-h-[14.625rem]'>
          <div className='flex w-full py-4 px-3 justify-between'>
            <h3 className='font-bold text-[var(--gray-600)] text-lg'>Meus links</h3>
            <button
              className='flex items-center bg-[var(--gray-200)] rounded-md leading-4 p-2
              hover:cursor-pointer
              hover:not-[disabled]::border-3
              hover:not-[disabled]::border-[var(--blue-base)]
              disabled:opacity-50
              disabled:cursor-not-allowed'
              disabled
            >
              <DownloadSimpleIcon width={16} height={16} className='text-[var(--gray-600)]' />
              <span className='font-semibold text-sm text-[var(--gray-500)] px-2'>Baixar CSV</span>
            </button>
          </div>
          <hr className='text-[var(--gray-200)] mx-2' />
          <div className='flex flex-col items-center justify-center py-4'>
            <div className='flex py-4'>
              <LinkIcon width={28} height={24} className='text-[var(--gray-400)]' />
            </div>
            <p className='text-xs text-[var(--gray-500)] uppercase'>Ainda não existem links cadastrados</p>
          </div>
        </div>
      </div>
    </div>
  )
}
