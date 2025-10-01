import { LinksList } from '../components/link-list'
import { LogoHeader } from '../components/logo-header'
import { NewLink } from '../components/new-link-form'

export function Home () {
  return (
    <div className='flex flex-col pt-4 md:lg:pt-24 lg:pt-24 min-h-screen w-full lg:px-6'>
      <div className='flex flex-col items-center lg:items-start gap-5'>
        <div className='w-full max-w-[23.75rem] flex justify-center lg:justify-start'>
          <LogoHeader />
        </div>

        <div className='flex flex-col items-center lg:flex-row lg:items-start gap-5 w-full'>
          <div className='w-full max-w-[23.75rem]'>
            <NewLink />
          </div>
          <div className='w-full max-w-[36.25rem] mb-2'>
            <LinksList />
          </div>
        </div>
      </div>
    </div>
  )
}
