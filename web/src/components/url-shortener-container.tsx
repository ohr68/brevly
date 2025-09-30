import type { Link } from './link-item'
import { LinksList } from './link-list'
import { LogoHeader } from './logo-header'
import { NewLinkForm } from './new-link-form'

const mockLinks: Link[] = Array.from({ length: 50 }).map((_, _i) => ({
  shortUrl: 'brev.ly/Portfolio-Dev',
  originalUrl: 'devsite.portfolio.com.br/devname-123456',
  accessCount: 30,
}))

export function UrlShortenerContainer () {
  return (
    <div className='flex flex-col px-6 pt-24 sm:px-10 min-h-screen'>
      <LogoHeader />
      <div className='flex flex-col lg:flex-row lg:items-start gap-5'>
        <div className='flex justify-center w-full lg:w-auto'>
          <NewLinkForm />
        </div>
        <div className='flex justify-center w-full lg:w-auto'>
          <LinksList links={mockLinks} />
        </div>
      </div>
    </div>
  )
}
