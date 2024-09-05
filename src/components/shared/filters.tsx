import React from 'react'

import { Input } from '@/components/ui'
import { Heading } from './heading'
import { FilterCheckboxGroup } from './filter-checkbox-group'
import { FilterCheckbox, type IFilterCheckbox } from './filter-checkbox'

const ingredients: IFilterCheckbox[] = [
  {
    text: 'Сырный соус',
    value: '1',
  },
  {
    text: 'Моцарелла',
    value: '2',
  },
  {
    text: 'Чеснок',
    value: '3',
  },
  {
    text: 'Красный лук',
    value: '4',
  },
  {
    text: 'Соленые огурчики',
    value: '5',
  },
  {
    text: 'Свежие томаты',
    value: '6',
  },
]

interface IFilters {
  className?: string
}

export const Filters: React.FC<IFilters> = ({ className }) => {
  return (
    <div className={className}>
      {/* Основные */}
      <Heading className="mb-4" text="Фильтры" size="sm" />
      <div className="mb-4 gap-3.5 flex flex-col">
        <FilterCheckbox text="Новинки" value="1" />
        <FilterCheckbox text="Хиты продаж" value="2" />
        <FilterCheckbox text="Акции и скидки" value="3" />
      </div>

      {/* Стоимость */}
      <div className="py-4 pb-6 flex flex-col border-t border-neutral-200">
        <span className="mb-4 font-bold">Стоимость</span>
        <div className="mb-4 gap-2.5 flex items-center">
          <Input min={275} max={1250} type="number" placeholder="от 275 ₽" />
          <Input min={275} max={1250} type="number" placeholder="до 1250 ₽" />
        </div>
      </div>

      {/* Ингредиенты */}
      <FilterCheckboxGroup
        className="py-4 pb-6 flex flex-col"
        text="Ингредиенты"
        items={ingredients}
        defaultItems={ingredients}
        limit={5}
      />
    </div>
  )
}
