import notFound from '@/assets/404.svg'
import { Link } from 'react-router-dom'

export function NotFound () {
  return (
    <div className='flex flex-col bg-[var(--white)] w-full max-w-[36.25rem] rounded-md justify-center items-center p-10'>
      <div className='flex w-full justify-center items-center py-4'>
        <img src={notFound} alt='notFound' />
      </div>
      <div className='flex w-full justify-center py-4'>
        <h3 className='text-2xl text-[var(--gray-600)] font-bold'>Link não encontrado</h3>
      </div>
      <div className='inline-block text-center py-4'>
        <span className='text-md text-[var(--gray-500)]'>
          O link que você está tentando acessar não existe, foi removido ou é uma url inválida.
          Saiba mais em
        </span>
        <Link
          to='/' className='font-semibold px-1
                text-[var(--blue-base)]
                hover:text-[var(--blue-dark)]'
        >
          brev.ly
        </Link>
      </div>
    </div>
  )
}
