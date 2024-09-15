import { cn } from '@/lib'

interface IDrawerItemInfo {
  name: string
  details: string
  doppings?: string
  className?: string
}

export const DrawerItemInfo: React.FC<IDrawerItemInfo> = ({
  name,
  details,
  doppings,
  className,
}) => {
  return (
    <div className={cn('flex-1', className)}>
      <h2 className="mb-1 font-bold leading-6">{name}</h2>
      <div className="gap-1 flex flex-col leading-3">
        <p className="w-[90%] text-xs font-medium text-gray-400">{details}</p>
        {doppings && <span className="text-xs font-medium text-gray-400">{doppings}</span>}
      </div>
    </div>
  )
}