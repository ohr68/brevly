import { LinksList } from '../components/link-list'
import { LogoHeader } from '../components/logo-header'
import { NewLink } from '../components/new-link-form'

export function Home () {
  return (
    <div className='flex flex-col px-6 pt-24 sm:px-10 min-h-screen'>
      <LogoHeader />
      <div className='flex flex-col lg:flex-row lg:items-start gap-5'>
        <div className='flex justify-center w-full lg:w-auto'>
          <NewLink />
        </div>
        <div className='flex justify-center w-full lg:w-auto'>
          <LinksList />
        </div>
      </div>
    </div>
  )
}
