'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import type { Product } from '@prisma/client'

import { cn } from '@/lib/utils'
import { Search, X, ArrowUpRight } from 'lucide-react'
import { useClickAway, useDebounce } from 'react-use'

import { api } from '@/services/api'

interface ISearchBar {
  className?: string
}

export const SearchBar: React.FC<ISearchBar> = ({ className }) => {
  const [query, setQuery] = React.useState('')
  const [items, setItems] = React.useState<Product[]>([])
  const [isFocused, setIsFocused] = React.useState(false)

  const barRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  useClickAway(barRef, () => {
    setIsFocused(false)
  })

  const onClear = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  const getItems = async () => {
    try {
      const data = await api.products.getAll({ query, limit: 5 })
      setItems(data)
    } catch (error) {
      console.error('SearchBar: getItems()', error)
    }
  }

  useDebounce(
    () => {
      query.trim() && getItems()
    },
    350,
    [query]
  )

  return (
    <>
      {/* Шторка */}
      {isFocused && <div className="inset-0 z-30 bg-neutral-700/50 fixed" />}

      {/* Поиск */}
      <div
        ref={barRef}
        className={cn(
          'h-12 z-30 flex flex-1 items-center justify-between bg-neutral-100 rounded-xl relative',
          className
        )}
      >
        <div className="h-full px-5 flex flex-1 items-center">
          <Search size={20} className="text-gray-400" />
          <input
            ref={inputRef}
            className="w-full h-full pl-5 bg-transparent outline-none"
            type="text"
            placeholder="Поиск..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
          {query && (
            <button onClick={onClear}>
              <X size={20} className="text-gray-400 hover:text-gray-800 transition duration-200" />
            </button>
          )}
        </div>

        {/* Выпадающий список */}
        {items.length > 0 && (
          <div
            className={cn(
              'w-full top-16 py-2.5 z-30 invisible opacity-0 bg-white rounded-xl shadow-md absolute transition duration-200',
              isFocused && 'visible opacity-100 -translate-y-2'
            )}
          >
            <ul className="gap-1.5 flex flex-1 flex-col">
              {items.map((item) => (
                <li key={item.id} className="w-full px-2.5 flex flex-1">
                  <Link
                    href="/"
                    className="px-3 py-2 flex items-center justify-between flex-1 rounded-2xl hover:bg-primary/10 transition duration-200"
                  >
                    <div className="gap-3.5 flex items-center">
                      <Image
                        className="rounded-xl"
                        width={32}
                        height={32}
                        src={item.imageUrl}
                        alt={item.name}
                        priority
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>

                    <ArrowUpRight size={18} className="text-gray-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
