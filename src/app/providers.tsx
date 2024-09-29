'use client'

import React from 'react'

import { AppProgressBar } from 'next-nprogress-bar'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from '@/components/ui'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppProgressBar
        height="2px"
        color="#ff6900"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Toaster position="top-center" duration={2000} />
      <SessionProvider>{children}</SessionProvider>
    </>
  )
}
