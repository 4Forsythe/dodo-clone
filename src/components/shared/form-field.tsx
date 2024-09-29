'use client'

import React from 'react'

import { cn } from '@/lib'
import { X } from 'lucide-react'
import { IMaskInput } from 'react-imask'
import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/ui'
import { FormErrorBlock } from '@/components/shared'

interface IFormField extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  mask?: string
  required?: boolean
  className?: string
}

export const FormField: React.FC<IFormField> = ({
  name,
  label,
  mask,
  required,
  className,
  ...props
}) => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext()

  const value = watch(name)
  const error = errors[name]

  const onClear = () => {
    setValue(name, '')
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <label htmlFor={name} className="mb-2 font-semibold">
          {label} {required && '*'}
        </label>
      )}

      <div className="mb-1.5 relative">
        {mask ? (
          <IMaskInput
            id={name}
            className={cn(
              'h-12 pr-10 font-medium flex w-full rounded-lg border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              { 'border-destructive': error }
            )}
            mask={mask}
            radix="."
            unmask={true}
            value={value}
            placeholder={props.placeholder}
            onAccept={(value) => setValue(name, value)}
            {...register(name)}
          />
        ) : (
          <Input
            id={name}
            className={cn('h-12 pr-10 text-base font-medium', { 'border-destructive': error })}
            {...register(name)}
            {...props}
          />
        )}

        {value && (
          <button
            className="top-1/2 right-4 -translate-y-1/2 text-neutral-300 hover:text-neutral-500 absolute transition duration-200"
            onClick={onClear}
          >
            <X size={20} />
          </button>
        )}
      </div>

      {error && <FormErrorBlock text={error.message as string} />}
    </div>
  )
}
