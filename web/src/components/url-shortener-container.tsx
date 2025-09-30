import { CopyIcon, DownloadSimpleIcon, TrashIcon } from '@phosphor-icons/react'
import logo from '../assets/Logo.svg'

export function UrlShortenerContainer () {
  return (
    <div className='flex flex-col px-6 pt-24 sm:px-10 min-h-screen'>
      <div className='flex w-full justify-start py-6'>
        <img src={logo} height={24} width={97} alt='Logo' />
      </div>

      <div className='flex flex-col lg:flex-row lg:items-start gap-5'>
        <div className='flex justify-center w-full lg:w-auto'>
          <div className='w-full lg:w-[23.75rem] bg-[var(--white)] border border-[var(--gray-200)] rounded-xl px-8 py-10'>
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
                  className='w-full border border-[var(--gray-200)] rounded-md
                  py-2 px-3 text-[var(--gray-700)] placeholder-[var(--gray-400)]
                  focus:outline-none'
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
                    className='flex-1 py-2 px-2 text-[var(--gray-700)]
                    placeholder-[var(--gray-400)] focus:outline-none'
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
        </div>

        <div className='flex justify-center w-full lg:w-auto'>
          <div className='w-full lg:w-[36.25rem] bg-[var(--white)] border border-[var(--gray-200)] rounded-xl px-8 py-6 flex flex-col max-h-[70vh]'>
            <div className='flex w-full justify-between items-center mb-2 flex-shrink-0'>
              <h3 className='font-bold text-[var(--gray-600)] text-lg'>Meus links</h3>
              <button
                className='flex items-center bg-[var(--gray-200)] rounded-md px-3 py-2
                  border border-transparent hover:cursor-pointer hover:enabled:border
                  hover:enabled:border-[var(--blue-base)]
                  disabled:opacity-50 disabled:cursor-not-allowed'
                disabled
              >
                <DownloadSimpleIcon width={16} height={16} className='text-[var(--gray-600)]' />
                <span className='font-semibold text-sm text-[var(--gray-500)] ml-2'>
                  Baixar CSV
                </span>
              </button>
            </div>

            <hr className='border-t border-[var(--gray-200)] mb-2 flex-shrink-0' />

            <div className='flex-1 overflow-y-auto'>
              {Array.from({ length: 50 }).map((_, index) => (
                <div
                  key={index}
                  className='flex flex-col border-b border-b-[var(--gray-200)] items-center justify-center mx-2'
                >
                  <div className='flex w-full justify-between py-5'>
                    <div className='flex flex-col'>
                      <a
                        href='#'
                        className='text-md font-semibold text-[var(--blue-base)] hover:font-bold hover:text-[var(--blue-dark)]'
                      >
                        brev.ly/Portfolio-Dev
                      </a>
                      <span className='text-sm text-[var(--gray-500)]'>
                        devsite.portfolio.com.br/devname-123456
                      </span>
                    </div>

                    <div className='flex flex-row items-center'>
                      <div className='flex px-5'>
                        <span className='text-sm text-[var(--gray-500)]'>30 acessos</span>
                      </div>
                      <div className='flex gap-2'>
                        <button
                          className='flex items-center bg-[var(--gray-200)] rounded-md p-2
                            border border-transparent hover:enabled:border hover:enabled:border-[var(--blue-base)]
                            hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          <CopyIcon />
                        </button>

                        <button
                          className='flex items-center bg-[var(--gray-200)] rounded-md p-2
                            border border-transparent hover:enabled:border hover:enabled:border-[var(--blue-base)]
                            hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {/* <div className="flex flex-col items-center justify-center py-6">
              <LinkIcon width={28} height={24} className="text-[var(--gray-400)] mb-3" />
              <p className="text-xs text-[var(--gray-500)] uppercase">
                Ainda não existem links cadastrados
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
