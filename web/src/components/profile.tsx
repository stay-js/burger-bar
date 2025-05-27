'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
// Import useUser() and useClerk()
import { useUser, useClerk } from '@clerk/nextjs'
// Import Next's router
import { useRouter } from 'next/navigation'
// Import the Image element
import Image from 'next/image'
// Import Link to add more buttons to the menu
import Link from 'next/link'

export const UserButton = () => {
  // Grab the `isLoaded` and `user` from useUser()
  const { isLoaded, user } = useUser()
  // Grab the signOut and openUserProfile methods
  const { signOut, openUserProfile } = useClerk()
  // Get access to Next's router
  const router = useRouter()

  // Make sure that the useUser() hook has loaded
  if (!isLoaded) return null
  // Make sure there is valid user data
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
        <DropdownMenu.Content className="z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white px-4 py-3 text-black shadow-xl">
          <DropdownMenu.Label className="mb-2 text-xs font-medium text-gray-500">
            {user.username}
          </DropdownMenu.Label>
          <DropdownMenu.Separator className="my-2 h-px bg-gray-200" />
          <DropdownMenu.Group className="space-y-2">
            <DropdownMenu.Item asChild>
              <button
                onClick={() => openUserProfile()}
                className="w-full text-left text-sm hover:text-blue-600"
              >
                Profil
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link href="/subscriptions" className="block text-sm hover:text-blue-600">
                Előfizetés
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator className="my-2 h-px bg-gray-200" />
          <DropdownMenu.Item asChild>
            <button
              onClick={() => signOut(() => router.push("/"))}
              className="w-full text-left text-sm text-red-600 hover:underline"
            >
              Kijelentkezés
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}