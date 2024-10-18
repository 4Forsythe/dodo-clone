import Link from 'next/link'

import { Container, Heading } from '@/components/shared'

export default function AboutPage() {
  return (
    <Container className="w-full pt-10 pb-20">
      <div className="max-w-[800px] flex flex-1 flex-col">
        <div className="mb-5 space-y-2 flex flex-col">
          <Heading className="mb-5 font-semibold" text="Мы" size="3xl" />

          <p className="text-lg font-medium">
            <b>Dodo Clone</b> — это проект, разработанный{' '}
            <Link className="text-primary" href="/" target="_blank">
              <b>одним энтузиастом</b>
            </Link>
            , которого вдохновила концепция и успех знаменитой{' '}
            <Link className="text-primary" href="dodopizza.ru" target="_blank">
              <b>Додо Пиццы.</b>
            </Link>
          </p>
          <p className="text-lg font-medium">
            Текущая версия копирует и совершенствует большую часть функциональных возможностей
            оригинального сайта в области frontend-технологий.
          </p>
        </div>

        <div className="mb-5 space-y-2 flex flex-col">
          <Heading className="mb-5 font-semibold" text="Философия" size="xl" />

          <p className="text-lg font-medium">
            Идеология проекта заключается в трёх основных принципах: изучении, реализации и
            совершенствовании.
          </p>
          <p className="text-lg font-medium">
            Одной из причин создания данного сайта является возможность попрактиковаться и
            продемонстрировать своё упорство, дисциплину и стремление достигать поставленных целей —
            совершества.
          </p>
        </div>

        <div className="mb-5 space-y-2 flex flex-col">
          <Heading className="mb-5 font-semibold" text="Реализация" size="xl" />

          <p className="text-lg font-medium">
            При создании приложения были задействованы актуальные и современные технологии на базе{' '}
            <Link className="text-primary" href="https://react.dev" target="_blank">
              <b>React</b>
            </Link>{' '}
            и{' '}
            <Link className="text-primary" href="https://www.typescriptlang.org" target="_blank">
              <b>TypeScript.</b>
            </Link>
          </p>
          <p className="text-lg font-medium">
            Структура и стилистика кода вдохновлены основными принципами{' '}
            <Link
              className="text-primary"
              href="https://en.wikipedia.org/wiki/Best_practice"
              target="_blank"
            >
              <b>best practice</b>
            </Link>
            , хоть и не доведены до идеала. На всех стадиях разработки главной задачей оставалось
            сохранение чистоты, понятности, масштабируемости и соблюдение{' '}
            <Link
              className="text-primary"
              href="https://en.wikipedia.org/wiki/Separation_of_concerns"
              target="_blank"
            >
              <b>принципа разделения ответственности</b>
            </Link>{' '}
            для исходного кода.
          </p>
        </div>
      </div>
    </Container>
  )
}
