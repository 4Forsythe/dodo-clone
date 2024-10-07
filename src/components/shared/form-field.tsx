'use client'

import React from 'react'

import { cn } from '@/lib'
import { X } from 'lucide-react'
import { IMaskInput } from 'react-imask'
import { get, useFormContext } from 'react-hook-form'

import { Input } from '@/components/ui'
import { FormErrorBlock } from '@/components/shared'

interface IFormFieldConflictAttributes {
  size?: 'md' | 'sm'
}

interface IFormField
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof IFormFieldConflictAttributes> {
  name: string
  label?: string
  size?: 'md' | 'sm'
  mask?: string
  required?: boolean
  hiddenError?: boolean
  className?: string
}

export const FormField: React.FC<IFormField> = ({
  name,
  label,
  size = 'md',
  type,
  mask,
  required,
  hiddenError,
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
  const error = get(errors, name)

  const onClear = () => {
    setValue(name, '')
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <label htmlFor={name} className="mb-2 font-semibold">
          {label} {required && <span className="text-primary">*</span>}
        </label>
      )}

      <div className="relative">
        {mask ? (
          <IMaskInput
            id={name}
            className={cn(
              'pr-10 font-medium flex w-full rounded-lg border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              { 'h-12': size === 'md' },
              { 'h-10': size === 'sm' },
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
            className={cn(
              'pr-10 text-base font-medium',
              { 'h-12': size === 'md' },
              { 'h-10': size === 'sm' },
              { 'border-destructive': error }
            )}
            autoComplete="off"
            {...register(name)}
            {...props}
          />
        )}

        {value && !props.readOnly && (
          <button
            className="top-1/2 right-3 -translate-y-1/2 text-neutral-400 hover:text-black absolute transition duration-200"
            onClick={onClear}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {error && !hiddenError && (
        <div className="mt-1">
          <FormErrorBlock text={error.message as string} />
        </div>
      )}
    </div>
  )
}
