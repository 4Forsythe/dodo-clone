'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib'
import { toast } from 'sonner'
import { Mails, Pizza, TriangleAlert } from 'lucide-react'
import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui'
import { Container, ProfileForm, TipBlock } from '@/components/shared'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { route } from '@/config'
import { deleteUser, sendCode } from '@/app/actions'

import type { User } from '@prisma/client'

interface IProfile {
  profile: User
  isActivated?: boolean
  className?: string
}

export const Profile: React.FC<IProfile> = ({ profile, isActivated, className }) => {
  const router = useRouter()

  const [isSending, setIsSending] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const onCloseTip = () => {
    router.replace(route.PROFILE)
  }

  const onSendMail = async () => {
    try {
      setIsLoading(true)

      await sendCode(profile.email)

      setIsSending(true)
      toast.success(`Письмо отправлено на ${profile.email}`)
    } catch (error) {
      toast.error('Сейчас мы не можем отправить письмо...')
      console.error('Profile: onSendMail()', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onDeleteProfile = async () => {
    try {
      setIsLoading(true)

      await deleteUser()
      signOut({ callbackUrl: route.HOME })

      toast.success('Учётная запись была удалена')
    } catch (error) {
      toast.error('Ой! Кажется, что-то пошло не так...')
      console.error('Profile: onDeleteProfile()', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className={cn('w-full pt-10 pb-20', className)}>
      <div className="flex-col">
        {profile.activatedAt && isActivated && (
          <TipBlock
            className="max-w-[30rem]"
            icon={Pizza}
            title="Учетная запись подтверждена"
            description="Вы успешно прошли все этапы регистрации и подтвердили свой адрес электронной почты. Теперь вам доступны все возможности сайта. Спасибо за регистрацию!"
            extra={
              <Button className="w-fit rounded-xl" size="sm" onClick={onCloseTip}>
                Всё понятно
              </Button>
            }
          />
        )}

        {!profile.activatedAt && !isSending && (
          <TipBlock
            className="max-w-[35rem]"
            icon={TriangleAlert}
            title="Учетная запись не подтверждена"
            description="На ваш адрес электронной почты было отправлено письмо для подтверждения, которое вы проигнорировали. Вы все еще можете перейти по ссылке в нем, чтобы снять имеющиеся ограничения."
            extra={
              <Button
                className="w-fit rounded-xl"
                size="sm"
                isLoading={isLoading}
                onClick={onSendMail}
              >
                Подтвердить email
              </Button>
            }
          />
        )}

        {!profile.activatedAt && isSending && (
          <TipBlock
            className="max-w-[30rem]"
            icon={Mails}
            title="Письмо для подтверждения отправлено"
            description="Мы отправили новое письмо для подтверждения на ваш адрес электронной почты. Пожалуйста, перейдите по ссылке из него для верификации учетной записи."
          />
        )}

        <ProfileForm profile={profile} />

        <div className="mt-20 gap-2.5 flex items-center">
          <Button
            className="font-semibold rounded-xl"
            variant="outline"
            size="lg"
            type="button"
            onClick={() => signOut({ callbackUrl: route.HOME })}
          >
            Выйти
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="font-semibold rounded-xl"
                variant="secondary"
                size="lg"
                type="button"
              >
                Удалить мои данные
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Вы в этом уверены?</AlertDialogTitle>
                <AlertDialogDescription>
                  Вы точно уверены в том, что хотите полностью{' '}
                  <b>удалить все свои учётные данные</b> на нашем сайте?
                  <br />
                  Восстановить их заново будет невозможно.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={onDeleteProfile} disabled={isLoading}>
                  Да, абсолютно
                </AlertDialogAction>
                <AlertDialogCancel disabled={isLoading}>Отмена</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Container>
  )
}
