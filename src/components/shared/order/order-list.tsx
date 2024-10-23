'use client'

import React from 'react'
import Link from 'next/link'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Heading } from '@/components/shared'
import { Badge, Skeleton } from '@/components/ui'

import { useOrders } from '@/hooks'

import { route } from '@/config'
import { ORDER_STATUS_MAP } from '@/constants'

interface IOrderList {
  className?: string
}

export const OrderList: React.FC<IOrderList> = ({ className }) => {
  const { items, isLoading } = useOrders()

  return (
    <div className={className}>
      <Heading className="mb-2" text="История заказов" size="md" />
      <p className="mb-4 text-sm">10 заказов за последнее время</p>

      {isLoading ? (
        <div className="gap-2 flex flex-col">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[48px]">№</TableHead>
              <TableHead>Время заказа</TableHead>
              <TableHead>Сумма</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{`${new Date(item.createdAt).toLocaleDateString(undefined, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })} в ${new Date(item.createdAt).toLocaleTimeString(undefined, {
                  hour: 'numeric',
                  minute: '2-digit',
                })}`}</TableCell>
                <TableCell>{item.amount} ₽</TableCell>
                <TableCell>
                  <Badge variant="destructive">{ORDER_STATUS_MAP[item.status]}</Badge>
                </TableCell>
                <TableCell>
                  <Link
                    className="text-primary"
                    href={`${route.THANKS}?order=${item.userId}${item.id}`}
                    target="_blank"
                  >
                    Посмотреть
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
