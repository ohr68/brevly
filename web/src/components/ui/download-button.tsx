import { DownloadSimpleIcon, SpinnerIcon } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { exportUrlsAccessed } from '@/api/export-urls-accessed'
import { toast } from 'sonner'
import { downloadUrl } from '@/utils/download-url'

type DownloadCsvButtonProps = {
  disabled?: boolean
}

export function DownloadCsvButton ({ disabled }: DownloadCsvButtonProps) {
  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const fileUrl = await exportUrlsAccessed()
      return fileUrl
    },
    onError: (err: any) => {
      toast.error(err.message || 'Erro ao baixar CSV')
    },
    onSuccess: (data) => downloadUrl(data.fileUrl)
  })

  return (
    <button
      className='flex items-center bg-[var(--gray-200)] rounded-md px-3 py-2 border border-transparent hover:cursor-pointer hover:enabled:border hover:enabled:border-[var(--blue-base)] disabled:opacity-50 disabled:cursor-not-allowed'
      disabled={disabled || isLoading}
      onClick={() => mutateAsync()}
    >
      {isLoading
        ? <SpinnerIcon width={16} height={16} className='text-[var(--gray-600)] animate-spin' />
        : <DownloadSimpleIcon width={16} height={16} className='text-[var(--gray-600)]' />}
      <span className='font-semibold text-sm text-[var(--gray-500)] ml-2'>
        Baixar CSV
      </span>
    </button>
  )
}
