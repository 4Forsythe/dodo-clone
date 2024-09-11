import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui'
import { Container, SearchBar } from '@/components/shared'

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
          <Button className="group relative">
            <b>Корзина</b>
            <span className="w-[1px] h-2/3 mx-2.5 bg-white/50" />
            <b className="transition duration-300 group-hover:opacity-0">5</b>
            <ArrowRight
              size={18}
              className="right-3.5 opacity-0 -translate-x-2 absolute transition duration-300 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </Button>
        </div>
      </Container>
    </header>
  )
}
