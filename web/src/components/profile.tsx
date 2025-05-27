'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { useUser, useClerk } from '@clerk/nextjs'

import { useRouter } from 'next/navigation'

import Image from 'next/image'

import Link from 'next/link'

import {
  ArrowRightEndOnRectangleIcon,
  Cog6ToothIcon,
  CalendarIcon ,
} from '@heroicons/react/24/outline'


export const UserButton = () => {
  const { isLoaded, user } = useUser()

  const { signOut, openUserProfile } = useClerk()

  const router = useRouter()

  if (!isLoaded) return null

  if (!user?.id) return null
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-600 bg-black shadow-sm transition hover:ring-1 hover:ring-gray-600"
          title="Profil megnyitása"
          type="button"
        >
          <Image
            src={user.imageUrl}
            alt="Profilkép"
            fill
            className="object-cover"
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10} 
          align="end" 
          className="mt-4 w-52 rounded-xl border border-gray-200 bg-white px-4 py-4 text-black drop-shadow-2xl ml-[-10px]"
        >
          <div className="px-4 py-3">
            <div className="text-sm font-medium">{user.fullName}</div>
            <div className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</div>
          </div>
          <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
          <DropdownMenu.Item asChild>
            <button
              onClick={() => openUserProfile()}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
            >
              <Cog6ToothIcon className="h-5 w-5 text-gray-500" />
              Manage account
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link
              href="/foglalasaim"
              className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
            >
              <CalendarIcon  className="h-5 w-5 text-gray-500" />
              Foglalásaim
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
          <DropdownMenu.Item asChild>
            <button
              onClick={() => signOut(() => router.push('/'))}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
              Sign out
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}