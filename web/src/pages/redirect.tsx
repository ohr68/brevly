import { getOriginalUrl, type GetOriginalUrlParams } from '@/api/get-original-url'
import logoIcon from '@/assets/Logo_Icon.svg'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import z from 'zod'

const paramsSchema = z.object({
  'url-encurtada': z.string().min(1, 'Shortened URL param is required'),
})

export function Redirect () {
  const params = useParams()
  const parseResult = paramsSchema.safeParse(params)
  const [notFound, setNotFound] = useState(false)

  if (!parseResult.success) {
    return <Navigate to='*' />
  }

  const shortenedUrl = parseResult.data['url-encurtada']
  const hasMutated = useRef(false)

  const mutation = useMutation({
    mutationFn: handleShortenedUrl,
    async onSuccess (data, _params) {
      window.location.href = data.originalUrl
    }
  })

  async function handleShortenedUrl ({ shortenedUrl } : GetOriginalUrlParams) {
    try {
      const { originalUrl } = await getOriginalUrl({ shortenedUrl })

      return { originalUrl }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setNotFound(true)
      }
      throw err
    }
  }

  useEffect(() => {
    if (!hasMutated.current) {
      mutation.mutate({ shortenedUrl })
      hasMutated.current = true
    }
  }, [shortenedUrl])

  if (notFound) {
    return <Navigate to='*' />
  }

  return (
    <div className='flex flex-col bg-[var(--white)] w-full max-w-[36.25rem]
    rounded-md justify-center items-center p-10'
    >
      <div className='flex w-full justify-center items-center py-4'>
        <img src={logoIcon} alt='logo' />
      </div>
      <div className='flex w-full justify-center py-4'>
        <h3 className='text-2xl text-[var(--gray-600)] font-bold'>
          Redirecionando...
        </h3>
      </div>
      <div className='flex flex-col py-4'>
        <span className='text-md text-[var(--gray-500)]'>
          O link será aberto automaticamente em alguns instantes.
        </span>
        <div className='flex w-full justify-center gap-2'>
          <span className='text-md text-[var(--gray-500)]'>
            Não foi redirecionado?
          </span>
          <Link
            to={mutation.data?.originalUrl ?? ''}
            className='underline text-[var(--blue-base)]
            hover:text-[var(--blue-dark)]'
          >
            Acesse aqui
          </Link>
        </div>
      </div>
    </div>
  )
}
