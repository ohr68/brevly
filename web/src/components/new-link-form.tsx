import { createShortenedUrl, type CreateShortenedUrlOutput } from '@/api/create-shortened-url'
import { env } from '@/env'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { FormFieldError } from './ui/form-field-error'
import type { ListUrlsResponse } from '@/api/list-urls'

const newLinkForm = z.object({
  originalUrl: z.url('URL inválida (precisa começar com http:// ou https://)'),
  shortenedUrl: z
    .string()
    .min(1, 'O link encurtado é obrigatório')
    .regex(
      /^[a-zA-Z0-9-]+$/,
      'O link encurtado só pode conter letras, números e traços (-)'
    )
})

type NewLinkForm = z.infer<typeof newLinkForm>

export function NewLink () {
  const queryClient = useQueryClient()
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<NewLinkForm>({
    resolver: zodResolver(newLinkForm)
  })

  const { mutateAsync: registerNewLinkFn } = useMutation({
    mutationFn: createShortenedUrl,
    async onSuccess (data) {
      updateLinksListOnCache(data)
    }
  })

  async function handleNewLink (data: NewLinkForm) {
    try {
      await registerNewLinkFn({
        originalUrl: data.originalUrl,
        shortenedUrl: `${env.VITE_FRONTEND_URL}/${data.shortenedUrl}`
      })
    } catch {
      toast.error('Erro ao cadastrar link.')
    }
  }

  function updateLinksListOnCache (createdUrl: CreateShortenedUrlOutput) {
    const linksListCache = queryClient.getQueriesData<ListUrlsResponse>({
      queryKey: ['urls', 'list'],
    })

    linksListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<ListUrlsResponse>(cacheKey, {
        ...cacheData,
        urls: [createdUrl, ...cacheData.urls],
      })
    })
  }

  return (
    <div className='w-full lg:w-[23.75rem] bg-[var(--white)] border border-[var(--gray-200)] rounded-xl px-8 py-10 flex-shrink-0'>
      <h3 className='font-bold text-lg mb-4'>Novo link</h3>

      <form onSubmit={handleSubmit(handleNewLink)}>
        <div className='flex flex-col gap-4'>
          <div>
            <label htmlFor='originalUrl' className='text-xs text-[var(--gray-500)] uppercase block mb-2'>
              Link Original
            </label>
            <input
              type='text'
              id='originalUrl'
              className='w-full border border-[var(--gray-200)] rounded-md py-2 px-3 text-[var(--gray-700)] placeholder-[var(--gray-400)] focus:outline-none'
              placeholder='www.exemplo.com.br'
              {...register('originalUrl')}
            />
            {errors.originalUrl && (<FormFieldError message={errors.originalUrl.message ?? ''} />)}
          </div>

          <div>
            <label htmlFor='shortenedUrl' className='text-xs text-[var(--gray-500)] uppercase block mb-2'>
              Link Encurtado
            </label>
            <div className='flex items-center border border-[var(--gray-200)] rounded-md overflow-hidden'>
              <span className='pl-3 text-[var(--gray-400)]'>brev.ly/</span>
              <input
                type='text'
                id='shortenedUrl'
                className='flex-1 py-2 text-[var(--gray-700)] placeholder-[var(--gray-400)] focus:outline-none'
                {...register('shortenedUrl')}
              />
            </div>
            {errors.shortenedUrl && (<FormFieldError message={errors.shortenedUrl.message ?? ''} />)}
          </div>
        </div>

        <button
          type='submit'
          className='mt-6 w-full bg-[var(--blue-base)] rounded-md text-white text-md py-3
          hover:enabled:bg-[var(--blue-dark)] hover:cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isSubmitting}
        >
          Salvar link
        </button>
      </form>
    </div>
  )
}
