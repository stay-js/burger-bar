"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "~/components/ui/button";
import { CalendarIcon, SettingsIcon, LogOutIcon } from "lucide-react";

export const UserProfile = () => {
  const { isLoaded, user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  const router = useRouter();

  if (!isLoaded) return null;
  if (!user?.id) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          className="relative h-8 w-8 overflow-hidden rounded-full hover:ring-1 hover:ring-gray-600"
          title="Profil megnyitása"
        >
          <Image
            src={user.imageUrl}
            alt="Profilkép"
            fill
            className="object-cover"
          />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10}
          align="end"
          className="mt-4 w-fit min-w-52 rounded-xl border border-gray-200 bg-white px-4 py-4 text-black drop-shadow-2xl"
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <Image
              src={user.imageUrl}
              alt="Profilkép"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div>
              <div className="text-sm font-medium">{user.fullName}</div>
              <div className="text-xs text-gray-500">
                {user.primaryEmailAddress?.emailAddress}
              </div>
            </div>
          </div>
          <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
          <DropdownMenu.Item asChild>
            <Button
              onClick={() => openUserProfile()}
              variant="ghost"
              className="flex w-full justify-start gap-2 hover:bg-neutral-100 hover:text-neutral-800"
            >
              <SettingsIcon className="text-gray-500" />
              Profil beállítások
            </Button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Button
              asChild
              variant="ghost"
              className="flex w-full justify-start"
            >
              <Link
                href="/foglalasaim"
                className="flex w-full justify-start gap-2 hover:bg-neutral-100 hover:text-neutral-800"
              >
                <CalendarIcon className="text-gray-500" />
                Foglalásaim
              </Link>
            </Button>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
          <DropdownMenu.Item asChild>
            <Button
              variant="ghost"
              className="flex w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-600"
              onClick={() => signOut(() => router.push("/"))}
            >
              <LogOutIcon />
              Kijelentkezés
            </Button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
