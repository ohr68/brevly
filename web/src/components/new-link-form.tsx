import { createShortenedUrl, type CreateShortenedUrlOutput } from '@/api/create-shortened-url'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { FormFieldError } from './ui/form-field-error'
import type { ListUrlsResponse } from '@/api/list-urls'

const newLinkForm = z.object({
  originalUrl: z.url('Informe uma url válida.'),
  shortenedUrlSuffix: z
    .string()
    .min(1, 'O link encurtado é obrigatório')
    .regex(
      /^[a-z0-9-]+$/,
      'Informe uma url minúscula e sem espaço/caracter especial.'
    )
})

type NewLinkForm = z.infer<typeof newLinkForm>

export function NewLink () {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm<NewLinkForm>({
    resolver: zodResolver(newLinkForm),
    defaultValues: {
      originalUrl: '',
      shortenedUrlSuffix: ''
    }
  })

  const { mutateAsync: registerNewLinkFn } = useMutation({
    mutationFn: createShortenedUrl,
    async onSuccess (data) {
      addCreatedUrlToCache(data)
      reset()
    }
  })

  async function handleNewLink (data: NewLinkForm) {
    try {
      await registerNewLinkFn({
        originalUrl: data.originalUrl,
        shortenedUrlSuffix: data.shortenedUrlSuffix
      })
    } catch {
      toast.error('Erro ao cadastrar link.')
    }
  }

  function addCreatedUrlToCache (createdUrl: CreateShortenedUrlOutput) {
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
    <div className='w-full bg-[var(--white)] border border-[var(--gray-200)] rounded-xl px-8 py-10 flex-shrink-0'>
      <h3 className='font-bold text-lg mb-4'>Novo link</h3>

      <form onSubmit={handleSubmit(handleNewLink)}>
        <div className='flex flex-col gap-4'>
          <div className='group'>
            <label
              htmlFor='originalUrl'
              className={`text-xs uppercase block mb-2
                ${errors.originalUrl
                  ? 'font-semibold text-[var(--danger)]'
                  : 'text-[var(--gray-500)] group-focus-within:font-semibold group-focus-within:text-[var(--blue-base)]'}`}
            >
              Link Original
            </label>
            <input
              type='text'
              id='originalUrl'
              className={`w-full rounded-md py-2 px-3 text-[var(--gray-600)]
              placeholder-[var(--gray-400)] focus-within:outline-none 
              focus:border-2 focus:border-[var(--blue-base)]
              ${errors.originalUrl
                ? 'border-2 border-[var(--danger)]'
                : 'border border-[var(--gray-200)]'}`}
              placeholder='www.exemplo.com.br'
              {...register('originalUrl')}
            />
            {errors.originalUrl && (<FormFieldError message={errors.originalUrl.message ?? ''} />)}
          </div>

          <div className='group'>
            <label
              htmlFor='shortenedUrlSuffix'
              className={`text-xs uppercase block mb-2
                ${errors.originalUrl
                  ? 'font-semibold text-[var(--danger)]'
                  : 'text-[var(--gray-500)] group-focus-within:font-semibold group-focus-within:text-[var(--blue-base)]'}`}
            >
              Link Encurtado
            </label>
            <div className={`flex items-center rounded-md overflow-hidden
               focus-within:border-2 focus-within:border-[var(--blue-base)] 
               ${errors.shortenedUrlSuffix ? 'border-2 border-[var(--danger)]' : 'border border-[var(--gray-200)]'}`}
            >
              <span className='pl-3 text-[var(--gray-400)]'>brev.ly/</span>
              <input
                type='text'
                id='shortenedUrlSuffix'
                className='flex-1 py-2 text-[var(--gray-600)] placeholder-[var(--gray-400)] focus:outline-none'
                {...register('shortenedUrlSuffix')}
              />
            </div>
            {errors.shortenedUrlSuffix && (<FormFieldError message={errors.shortenedUrlSuffix.message ?? ''} />)}
          </div>
        </div>

        <button
          type='submit'
          className='mt-6 w-full bg-[var(--blue-base)] rounded-md text-white text-md py-3
          hover:enabled:bg-[var(--blue-dark)] hover:cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar link'}
        </button>
      </form>
    </div>
  )
}
