import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react'
import logo from '../assets/Logo.svg'

export function UrlShortenerContainer () {
  return (
    <div className='flex flex-col px-6 sm:px-10'>
      <div className='flex w-full justify-start py-6'>
        <img src={logo} height={24} width={97} alt='Logo' />
      </div>

      <div className='flex flex-col lg:flex-row gap-5'>
        {/* Novo link card */}
        <div className='w-full lg:w-[23.75rem] bg-[var(--white)] border border-[var(--gray-200)] rounded-xl px-6 py-5'>
          <h3 className='font-bold text-lg mb-4'>Novo link</h3>

          <div className='flex flex-col gap-4'>
            <div>
              <label
                htmlFor='original'
                className='text-xs text-[var(--gray-500)] uppercase block mb-2'
              >
                Link Original
              </label>
              <input
                type='text'
                id='original'
                className='w-full border border-[var(--gray-200)] rounded-md py-2 px-3 text-[var(--gray-700)] placeholder-[var(--gray-400)] focus:outline-none'
                placeholder='www.exemplo.com.br'
              />
            </div>

            <div>
              <label
                htmlFor='shortened'
                className='text-xs text-[var(--gray-500)] uppercase block mb-2'
              >
                Link Encurtado
              </label>
              <div className='flex items-center border border-[var(--gray-200)] rounded-md overflow-hidden'>
                <span className='pl-3 text-[var(--gray-400)]'>brev.ly/</span>
                <input
                  type='text'
                  id='shortened'
                  className='flex-1 py-2 px-2 text-[var(--gray-700)] placeholder-[var(--gray-400)] focus:outline-none'
                />
              </div>
            </div>
          </div>

          <button
            className='mt-6 w-full bg-[var(--blue-base)] rounded-md text-white text-md py-3
              hover:enabled:bg-[var(--blue-dark)]
              disabled:opacity-50 disabled:cursor-not-allowed'
            disabled
          >
            Salvar link
          </button>
        </div>

        <div className='w-full lg:w-[36.25rem] bg-[var(--white)] border border-[var(--gray-200)] rounded-xl px-5 py-3 max-h-[14.625rem]'>
          <div className='flex w-full py-4 px-3 justify-between items-center'>
            <h3 className='font-bold text-[var(--gray-600)] text-lg'>Meus links</h3>
            <button
              className='flex items-center bg-[var(--gray-200)] rounded-md px-3 py-2
                hover:enabled:border hover:enabled:border-[var(--blue-base)]
                disabled:opacity-50 disabled:cursor-not-allowed'
              disabled
            >
              <DownloadSimpleIcon width={16} height={16} className='text-[var(--gray-600)]' />
              <span className='font-semibold text-sm text-[var(--gray-500)] ml-2'>
                Baixar CSV
              </span>
            </button>
          </div>

          <hr className='border-t border-[var(--gray-200)] mx-2' />

          <div className='flex flex-col items-center justify-center py-6'>
            <LinkIcon width={28} height={24} className='text-[var(--gray-400)] mb-3' />
            <p className='text-xs text-[var(--gray-500)] uppercase'>
              Ainda não existem links cadastrados
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
