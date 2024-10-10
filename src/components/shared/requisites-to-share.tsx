'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib'
import { toast } from 'sonner'
import { Check, Copy, Landmark } from 'lucide-react'

import { Button } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import QrCode from '@/../public/images/donate-qr-code.png'
import TincoffIcon from '@/../public/icons/tinkoff.svg'

interface IRequisitesToShare {
  className?: string
}

export const RequisitesToShare: React.FC<IRequisitesToShare> = ({ className }) => {
  const [clipboard, setClipboard] = React.useState('')

  const CARD_REQUISITES = String(process.env.NEXT_PUBLIC_CARD_REQUISITES)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(CARD_REQUISITES)
      setClipboard(CARD_REQUISITES)

      toast.info('Реквизиты скопированы в буфер обмена')
    } catch (error) {
      console.error('RequisitesToShare: onCopy()', error)
      toast.error('Не удалось скопировать реквизиты')
    }
  }

  return (
    <div className={cn('w-[440px] px-5 py-7 flex bg-background rounded', className)}>
      <Tabs defaultValue="requisites" className="w-[400px] flex flex-1 flex-col">
        <TabsList>
          <TabsTrigger value="requisites">Реквизиты</TabsTrigger>
          <TabsTrigger value="qr-code">QR-код</TabsTrigger>
        </TabsList>
        <TabsContent value="requisites">
          <div className="h-full p-8 gap-3 flex flex-col items-center justify-center">
            <button
              className="px-4 py-2 gap-5 flex items-center border border-neutral-200 bg-neutral-100 rounded-xl transition duration-200 hover:bg-neutral-50 active:bg-neutral-100"
              onClick={onCopy}
            >
              <Image
                className="w-12 h-auto"
                width={48}
                height={48}
                src={TincoffIcon}
                alt="T-Bank"
                priority
              />
              <span className="text-lg font-extrabold">{CARD_REQUISITES}</span>
              {clipboard ? (
                <Check className="text-gray-400" size={18} />
              ) : (
                <Copy className="text-gray-400" size={18} />
              )}
            </button>

            <div className="w-full my-3.5 gap-3 flex items-center">
              <div className="w-full h-[1px] bg-neutral-300" />
              <span className="text-sm font-medium text-nowrap flex-1">или</span>
              <div className="w-full h-[1px] bg-neutral-300" />
            </div>

            <Link href="https://www.tinkoff.ru/rm/dyakonov.nikolay64/aQL3o31135" target="_blank">
              <Button className="gap-1.5 font-bold rounded-xl" size="lg">
                <Landmark size={18} />
                Перевод через онлайн-банк
              </Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="qr-code">
          <div className="h-full p-8 flex items-center justify-center">
            <Image
              className="select-none pointer-events-none"
              width={250}
              height={250}
              src={QrCode}
              placeholder="blur"
              alt="QR-код"
              priority
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
