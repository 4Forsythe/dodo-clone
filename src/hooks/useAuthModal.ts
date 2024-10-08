import React from 'react'

import { AuthModalContext } from '@/app/providers'

export const useAuthModal = () => {
  const context = React.useContext(AuthModalContext)

  if (!context) throw new Error('useAuthModal: useContext()')

  return context
}
