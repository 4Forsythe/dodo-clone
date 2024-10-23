import React from 'react'
import Link from 'next/link'

import { cn } from '@/lib'
import { route } from '@/config'

import { Container } from '@/components/shared'

interface IFooter {
  hasSearch?: boolean
  hasCart?: boolean
  className?: string
}

export const Footer: React.FC<IFooter> = ({ className }) => {
  const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME

  return (
    <footer className={cn('text-white bg-[#202020]', className)}>
      <Container className="pt-8 pb-5 flex flex-col">
        <div className="mb-7 gap-10 flex justify-between">
          <div className="grid flex-1 grid-cols-4">
            <div className="space-y-1 flex flex-col">
              <span className="mb-1 text-[17px] font-bold uppercase">Dodo Clone</span>
              <Link
                href={route.ABOUT}
                className="font-semibold text-neutral-400 transition duration-200 hover:text-white"
              >
                О нас
              </Link>
            </div>
            <div className="space-y-1 flex flex-col">
              <span className="mb-1 text-[17px] font-bold">Связь</span>
              <Link
                href={TELEGRAM_URL as string}
                target="_blank"
                className="font-semibold text-neutral-400 transition duration-200 hover:text-white"
              >
                Чат
              </Link>
            </div>
            <div className="space-y-1 flex flex-col">
              <span className="mb-1 text-[17px] font-bold">Поддержка</span>
              <Link
                href={route.DONATE}
                className="font-semibold text-neutral-400 transition duration-200 hover:text-white"
              >
                Купить мне кофе
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-end justify-end">
            <Link
              href="mailto:forsythe.dev@gmail.com"
              className="text-[17px] font-semibold text-neutral-400 transition duration-200 hover:text-white"
            >
              forsythe.dev@gmail.com
            </Link>
          </div>
        </div>
        <div className="py-6 gap-5 flex items-center justify-between border-t border-neutral-700">
          <div className="gap-2 flex items-center">
            <span className="font-black text-neutral-400 tracking-wide uppercase">DodoClone</span>
            <span className="font-medium text-neutral-400 tracking-wide">
              @ {new Date().getFullYear()}
            </span>
          </div>
          <Link
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            className="w-8 h-8 p-1.5 inline-flex items-center justify-center text-neutral-300/80 bg-[#c4c4c440] rounded transition duration-200 hover:bg-neutral-500/90"
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="#d4d4d4"
            >
              <g strokeWidth="0"></g>
              <g strokeLinecap="round" strokeLinejoin="round"></g>
              <g>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-140.000000, -7559.000000)" fill="#d4d4d4">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </Link>
        </div>
      </Container>
    </footer>
  )
}
