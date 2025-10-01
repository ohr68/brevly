import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Toaster } from 'sonner'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

export function App () {
  return (
    <div className='h-dvh w-full flex flex-col justify-center
    sm:items-center
    md:items-center
    lg:items-center px-4 lg:p-10'
    >
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <div className='lg:w-auto'>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </div>
  )
}
