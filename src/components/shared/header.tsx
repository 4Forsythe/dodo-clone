import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui'
import { CartButton, Container, SearchBar } from '@/components/shared'

import { route } from '@/config/routes.config'

interface IHeader {
  className?: string
}

export const Header: React.FC<IHeader> = ({ className }) => {
  return (
    <header className={cn('border border-b', className)}>
      <Container className="pt-6 pb-4 flex items-center justify-between">
        {/* Логотип */}
        <div className="mr-10 flex flex-col">
          <Link href={route.HOME} className="gap-2 flex items-end leading-[42px] overflow-hidden">
            <Image width={45} height={45} src="/images/dodo-pizza.svg" alt="Logo" priority />
            <h1 className="text-[28px] font-black uppercase">Dodo Clone</h1>
          </Link>
          <div className="ml-[53px]">
            <p className="text-xs text-gray-600 font-bold leading-[14px]">Сеть №1 в России</p>
            <p className="text-xs text-primary font-bold leading-[14px]">по количеству пиццерий</p>
          </div>
        </div>

        {/* Поиск */}
        <div className="mx-10 mr-10 grow">
          <SearchBar />
        </div>

        {/* Взаимодействие */}
        <div className="gap-3 flex items-center">
          <Button variant="outline">
            <b>Войти</b>
          </Button>
          <CartButton />
        </div>
      </Container>
    </header>
  )
}
