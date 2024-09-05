import React from 'react'

import clsx from 'clsx'

type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface IHeading {
  text: string
  size?: HeadingSize
  className?: string
}

export const Heading: React.FC<IHeading> = ({ text, size = 'sm', className }) => {
  const mapTagBySize = {
    xs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
    '2xl': 'h1',
  } as const

  const mapClassNameBySize = {
    xs: 'my-5 text-[16px]',
    sm: 'my-6 text-[20px] font-semibold',
    md: 'my-7 text-[24px] font-bold',
    lg: 'my-8 text-[32px] font-bold',
    xl: 'my-9 text-[40px] font-extrabold',
    '2xl': 'my-10 text-[48px] font-black',
  } as const

  return React.createElement(
    mapTagBySize[size],
    { className: clsx(mapClassNameBySize[size], className) },
    text
  )
}
