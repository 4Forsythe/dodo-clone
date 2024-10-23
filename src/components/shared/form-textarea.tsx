'use client'

import React from 'react'

import { cn } from '@/lib'
import { useFormContext } from 'react-hook-form'

import { Textarea } from '@/components/ui'
import { FormErrorBlock } from '@/components/shared'

interface IFormTextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label?: string
  required?: boolean
  className?: string
}

export const FormTextarea: React.FC<IFormTextarea> = ({
  name,
  label,
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

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <label className="mb-2 font-semibold">
          {label} {required && '*'}
        </label>
      )}

      <div className="mb-1.5 relative">
        <Textarea
          id={name}
          className="min-h-12 text-base font-medium"
          {...register(name)}
          {...props}
        />
      </div>

      {error && <FormErrorBlock text={error.message as string} />}
    </div>
  )
}
