import logoIcon from '@/assets/Logo_Icon.svg'

export function Redirect () {
  return (
    <div className='flex flex-col bg-[var(--white)] w-full max-w-[36.25rem] rounded-md justify-center items-center p-10'>
      <div className='flex w-full justify-center items-center py-4'>
        <img src={logoIcon} alt='logo' />
      </div>
      <div className='flex w-full justify-center py-4'>
        <h3 className='text-2xl text-[var(--gray-600)] font-bold'>Redirecionando...</h3>
      </div>
      <div className='flex flex-col py-4'>
        <span className='text-md text-[var(--gray-500)]'>O link será aberto automaticamente em alguns instantes.</span>
        <div className='flex w-full justify-center gap-2'>
          <span className='text-md text-[var(--gray-500)]'>Não foi redirecionado?</span>
          <a href='#' className='underline text-[var(--blue-base)] hover:text-[var(--blue-dark)]'>Acesse aqui</a>
        </div>
      </div>
    </div>
  )
}
