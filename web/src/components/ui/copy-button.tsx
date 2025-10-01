import { CopyIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'

export type CopyButtonProps = {
  text: string
}

export function CopyButton ({ text } : CopyButtonProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)

      const shortenedPart = text.split('/').pop() ?? text

      toast.info('Link copiado com sucesso', {
        description: `O link "${shortenedPart}" foi copiado para a área de transferência.`
      })
    } catch {
      toast.error('Não foi possível copiar.')
    }
  }

  return (
    <button
      onClick={handleCopy}
      className='flex items-center bg-[var(--gray-200)] rounded-md p-2 border
        border-transparent hover:enabled:border
        hover:enabled:border-[var(--blue-base)] hover:cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed'
    >
      <CopyIcon />
    </button>
  )
}
