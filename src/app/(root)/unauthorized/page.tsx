import { Container, ExceptionBlock } from '@/components/shared'

export default function UnauthorizedPage() {
  return (
    <Container className="flex flex-1 items-center justify-center">
      <ExceptionBlock
        title="Доступ запрещен"
        text="Текущую страницу могут просматривать только авторизованные пользователи"
        imageUrl="/images/unauthorized.svg"
      />
    </Container>
  )
}
