import { type NextPage } from "next";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "~/components/ui/button";
import { BurgerCard } from "~/components/burger-card";
import { createMetadata } from "~/lib/create-metadata";
import { db } from "~/server/db";
import { menu } from "~/server/db/schema";

export const metadata = createMetadata({
  path: "",
  title: "Home",
  description: "A hely, ahol a legfinomabb hamburgereket készítjük.",
});

const Page: NextPage = async () => {
  const data = await db.select().from(menu).execute();

  return (
    <>
      <header className="relative grid min-h-[70vh] place-items-center bg-[url('/images/header-bg.webp')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

        <div className="z-10 flex flex-col items-center gap-4 px-4 text-center">
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl"
            style={{ textShadow: "0 0 4px rgba(0, 0, 0, 0.75)" }}
          >
            Burger Bár
          </h1>

          <p
            className="max-w-md text-lg font-semibold sm:text-xl"
            style={{ textShadow: "0 0 4px rgba(0, 0, 0, 0.75)" }}
          >
            Ahol az autentikus magyar ízek találkoznak a gourmet burgerekkel.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/menu">
              <Button
                size="lg"
                className="bg-orange-400 text-neutral-900 hover:bg-orange-500"
              >
                Menü megtekintése
                <FaArrowRightLong />
              </Button>
            </Link>

            <Link href="/asztalfoglalas">
              <Button size="lg" variant="outline" className="text-black">
                Asztalfoglalás
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="grid w-full gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-4 px-6 py-12 md:px-12 md:py-24">
            <h2 className="text-3xl font-bold tracking-tight">Történetünk</h2>

            <p className="text-white/80">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              error ullam ab, fugiat aspernatur placeat reiciendis accusamus
              corrupti ad soluta non eligendi, temporibus ex qui suscipit
              laudantium enim minus dolor?
            </p>

            <p className="text-white/80">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              error ullam ab, fugiat aspernatur placeat reiciendis accusamus
              corrupti ad soluta non eligendi, temporibus ex qui suscipit
              laudantium enim minus dolor?
            </p>
          </div>

          <div className="h-full w-full bg-[url('/images/history-bg.webp')] bg-cover bg-center" />
        </section>

        <section className="bg-neutral-100 py-16 text-black">
          <div className="container mx-auto flex flex-col items-center gap-10 px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              Kedvenc burgereink
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.slice(0, 6).map((burger) => (
                <BurgerCard key={burger.id} burger={burger} />
              ))}
            </div>

            <Link href="/menu">
              <Button className="bg-orange-400 text-neutral-900 hover:bg-orange-500">
                Menü megtekintése
                <FaArrowRightLong />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto flex max-w-lg flex-col gap-12 px-4 text-center md:px-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold tracking-tight">
                Asztalfoglalás
              </h2>

              <p className="text-neutral-300">
                Foglaljon asztalt online, vagy hívjon minket közvetlenül! Ha a
                mai napra szeretne asztalt foglalni, kérjük telefonon vegye fel
                velünk a kapcsolatot.
              </p>
            </div>

            <Link href="/asztalfoglalas">
              <Button
                size="lg"
                className="w-full bg-orange-400 text-neutral-900 hover:bg-orange-500"
              >
                Foglaljon asztalt
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
