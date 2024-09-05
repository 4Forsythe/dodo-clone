'use client'

import React from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

interface IRangeSlider {
  min: number
  max: number
  step: number
  value: number[] | readonly number[]
  className?: string
  formatLabel?: (value: number) => string
  onValueChange?: (value: number[]) => void
}

const RangeSlider = React.forwardRef(
  (
    { min, max, step, value, className, formatLabel, onValueChange, ...props }: IRangeSlider,
    ref
  ) => {
    const initialValue = Array.isArray(value) ? value : [min, max]
    const [localValues, setLocalValues] = React.useState(initialValue)

    React.useEffect(() => {
      setLocalValues(Array.isArray(value) ? value : [min, max])
    }, [min, max, value])

    const handleValueChange = (values: number[]) => {
      setLocalValues(values)
      if (onValueChange) {
        onValueChange(values)
      }
    }

    return (
      <SliderPrimitive.Root
        ref={ref as React.RefObject<HTMLDivElement>}
        min={min}
        max={max}
        step={step}
        value={localValues}
        className={cn('relative flex w-full touch-none select-none mb-6 items-center', className)}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {localValues.map((value, index) => (
          <React.Fragment key={index}>
            <div
              className="absolute text-center"
              style={{
                left: `calc(${((value - min) / (max - min)) * 90}% + 0px)`,
                top: '10px',
              }}
            >
              <span className="text-sm font-bold">{formatLabel ? formatLabel(value) : value}</span>
            </div>
            <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    )
  }
)

RangeSlider.displayName = SliderPrimitive.Root.displayName

export { RangeSlider }
