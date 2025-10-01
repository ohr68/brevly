import { WarningIcon } from '@phosphor-icons/react'

export type FormFieldErrorProps = {
  message: string
}

export function FormFieldError ({ message }: FormFieldErrorProps) {
  return (
    <div className='flex flex-row items-center mt-1 gap-2'>
      <WarningIcon height={16} width={16} className='text-[var(--danger)]' />
      <p className='text-sm text-[var(--gray-500)]'>
        {message}
      </p>
    </div>
  )
}
