import { QueryClientProvider } from '@tanstack/react-query'
import { UrlShortenerContainer } from './components/url-shortener-container'
import { queryClient } from './lib/react-query'

export function App () {
  return (
    <div className='h-dvh flex flex-col items-center justify-center p-10'>
      <QueryClientProvider client={queryClient}>
        <UrlShortenerContainer />
      </QueryClientProvider>
    </div>
  )
}
