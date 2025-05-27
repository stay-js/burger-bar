"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { UserProfile } from "~/components/user-profile";

const items = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/menu",
    title: "Menü",
  },
  {
    path: "/asztalfoglalas",
    title: "Asztalfoglalás",
  },
];

export const Navigation: React.FC = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const pathname = usePathname();

  const handleClose = () => {
    setIsToggled(false);
    document.body.style.overflowY = "scroll";
  };

  const handleToggle = () => {
    setIsToggled((value) => {
      if (value) document.body.style.overflowY = "scroll";
      else document.body.style.overflowY = "hidden";

      return !value;
    });
  };

  return (
    <nav className="sticky top-0 z-10 flex h-16 select-none items-center justify-between bg-neutral-900 px-6 shadow">
      <Link
        href="/"
        className="group text-xl font-bold transition-colors hover:text-orange-400"
      >
        Burger{" "}
        <span className="text-orange-400 transition-colors group-hover:text-white">
          Bár
        </span>
      </Link>

      <div className="flex items-center gap-4 lg:gap-2">
        <div className="flex w-fit flex-col gap-2 lg:order-2 lg:flex-row lg:items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="bg-orange-400 max-lg:hidden">
                Bejelentkezés
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button className="max-lg:hidden">Regisztráció</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserProfile />
          </SignedIn>
        </div>

        <button
          className="h-6 w-6 lg:hidden"
          title="Menü megnyitása/elrejtése"
          type="button"
          onClick={handleToggle}
        >
          <span
            className={cn(
              "absolute block h-0.5 w-6 bg-current transition-all duration-300",
              isToggled ? "rotate-45" : "-translate-y-2",
            )}
          />
          <span
            className={cn(
              "absolute block h-0.5 w-4 bg-current transition-all duration-300",
              isToggled && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute block h-0.5 bg-current transition-all duration-300",
              isToggled ? "w-6 -rotate-45" : "w-2 translate-y-2",
            )}
          />
        </button>

        <div
          className={cn(
            "fixed left-0 top-16 h-[calc(100vh-4rem)] w-full overflow-y-auto bg-neutral-900 px-6 pb-20 pt-4 lg:static lg:flex lg:h-fit lg:w-fit lg:gap-1 lg:p-0",
            !isToggled && "hidden",
          )}
        >
          <ul className="content flex flex-col gap-8 lg:w-fit lg:flex-row lg:gap-0">
            {items.map(({ path, title }) => (
              <li key={`nav-${path}`}>
                <Link
                  className={cn(
                    "relative flex font-bold text-white transition-colors after:absolute after:-bottom-4 after:h-px after:w-full after:bg-neutral-600 lg:static lg:h-9 lg:items-center lg:rounded-md lg:px-3 lg:font-medium lg:after:hidden lg:hover:bg-neutral-800",
                    path !== pathname && "lg:text-neutral-400",
                  )}
                  onClick={handleClose}
                  href={path}
                >
                  {title}
                </Link>
              </li>
            ))}

            <SignInButton mode="modal">
              <li className="relative flex font-bold text-white transition-colors after:absolute after:-bottom-4 after:h-px after:w-full after:bg-neutral-600 lg:static lg:hidden lg:h-9 lg:items-center lg:rounded-md lg:px-3 lg:font-medium lg:after:hidden lg:hover:bg-neutral-800">
                Bejelentkezés
              </li>
            </SignInButton>
          </ul>
        </div>
      </div>
    </nav>
  );
};
