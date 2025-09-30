export function NewLinkForm () {
  return (
    <div className='w-full lg:w-[23.75rem] bg-[var(--white)] border border-[var(--gray-200)] rounded-xl px-8 py-10 flex-shrink-0'>
      <h3 className='font-bold text-lg mb-4'>Novo link</h3>

      <div className='flex flex-col gap-4'>
        <div>
          <label htmlFor='original' className='text-xs text-[var(--gray-500)] uppercase block mb-2'>
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
          <label htmlFor='shortened' className='text-xs text-[var(--gray-500)] uppercase block mb-2'>
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
        className='mt-6 w-full bg-[var(--blue-base)] rounded-md text-white text-md py-3 hover:enabled:bg-[var(--blue-dark)] disabled:opacity-50 disabled:cursor-not-allowed'
        disabled
      >
        Salvar link
      </button>
    </div>
  )
}
