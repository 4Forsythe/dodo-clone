'use client'

import React from 'react'

import { AppProgressBar } from 'next-nprogress-bar'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from '@/components/ui'
import { AuthModal } from '@/components/shared'

interface IAuthModalContext {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const AuthModalContext = React.createContext<IAuthModalContext | undefined>(undefined)

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsAuthModalOpen] = React.useState(false)

  const onOpen = () => setIsAuthModalOpen(true)
  const onClose = () => setIsAuthModalOpen(false)

  return (
    <>
      <AppProgressBar
        height="2px"
        color="#ff6900"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Toaster position="bottom-center" duration={2000} />
      <SessionProvider>
        <AuthModalContext.Provider value={{ isOpen, onOpen, onClose }}>
          <AuthModal />
          {children}
        </AuthModalContext.Provider>
      </SessionProvider>
    </>
  )
}
