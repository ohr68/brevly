import type { DeleteUrlOutput } from '@/api/delete-url'
import { TrashIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'

export type DeleteButtonProps = {
  shortenedUrl: string
  isDeleting: boolean
  onDelete: (shortenedUrl: string) => Promise<DeleteUrlOutput>
}

export function DeleteButton ({ shortenedUrl, isDeleting, onDelete }: DeleteButtonProps) {
  const handleDelete = async () => {
    const shortenedPart = shortenedUrl.split('/').pop() ?? shortenedUrl
    const confirmed = window.confirm(`Você realmente quer apagar o link ${shortenedPart}?`)
    if (!confirmed) return

    try {
      await onDelete(shortenedUrl)
      toast.success(`Link "${shortenedPart}" excluído com sucesso!`)
    } catch {
      toast.error('Não foi possível excluir o link.')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className='flex items-center bg-[var(--gray-200)] rounded-md p-2
        border border-transparent hover:enabled:border
        hover:enabled:border-[var(--blue-base)] hover:cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed'
      disabled={isDeleting}
    >
      <TrashIcon />
    </button>
  )
}
