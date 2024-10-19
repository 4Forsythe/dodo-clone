import type { Metadata } from 'next'
import Link from 'next/link'

import { DynamicImage } from '@/components/shared/dynamic-image'
import { Container, Heading, RequisitesToShare } from '@/components/shared'

export const metadata: Metadata = {
  title: '🍕 Поддержать разработчика',
}

export default function DonatePage() {
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME

  return (
    <Container className="w-full pt-10 pb-20">
      <div className="gap-20 flex justify-around">
        <div className="flex flex-1 flex-col">
          <Heading text="Поддержать разработчика ☕️" size="lg" />

          <div className="mb-8 space-y-2 flex flex-col">
            <p className="font-medium leading-6">Привет!</p>
            <p className="font-medium leading-6">
              Если тебе понравился мой проект и ты хотел бы помочь его развитию, ты всегда можешь
              оказать поддержку любым доступным способом справа.
            </p>
            <p className="font-medium leading-6">
              Это полностью добровольно, но даже небольшой вклад будет ещё больше стимулировать меня
              продолжать работать над новыми возможностями и улучшениями. Ваше внимание и поддержка
              — самая большая мотивация для развития.
            </p>
            <p className="font-medium leading-6">Спасибо, что оказался на этой странице!</p>
          </div>

          {GITHUB_USERNAME && (
            <div className="gap-3.5 inline-flex items-center">
              <DynamicImage
                className="rounded-full"
                width={60}
                height={60}
                src={`https://avatars.githubusercontent.com/${GITHUB_USERNAME}`}
                alt={GITHUB_USERNAME}
              />
              <div className="flex flex-col">
                <Link href={`https://github.com/${GITHUB_USERNAME}`} target="_blank">
                  <h1 className="font-bold transition duration-200 hover:text-primary">
                    4Forsythe
                  </h1>
                </Link>
                <span className="text-[15px] font-medium text-gray-400">Создатель проекта</span>
              </div>
            </div>
          )}
        </div>

        <RequisitesToShare />
      </div>
    </Container>
  )
}
