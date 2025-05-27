import { type NextPage } from "next";
import { createMetadata } from "~/lib/create-metadata";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Title } from "~/components/title";
import { db } from "~/server/db";
import { reservations } from "~/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { Button } from "~/components/ui/button";

export const metadata = createMetadata({
  path: "/foglalasaim",
  title: "Foglalásaim",
  description: "Burger Bár - Foglalásaim",
});

const Page: NextPage = async () => {
  const authObject = await auth();
  const user = await currentUser();

  if (!user) return authObject.redirectToSignIn();

  const userReservations = await db
    .select()
    .from(reservations)
    .where(eq(reservations.userId, user.id))
    .orderBy(desc(reservations.date));

  return (
    <main className="my-12 flex flex-col items-center gap-12 px-6">
      <Title>Foglalásaim</Title>

      <section className="flex w-full max-w-5xl flex-col gap-6">
        <div className="flex flex-col gap-6">
          {userReservations.map((reservation) => (
            <div key={reservation.id} className="flex flex-col gap-2">
              <ul className="rounded-lg bg-neutral-900 p-4 shadow-md">
                <li>
                  <b>Dátum:</b>{" "}
                  {new Date(reservation.date).toLocaleDateString("hu-HU")}
                </li>
                <li>
                  <b>Időpont:</b>{" "}
                  {new Date(reservation.date).toLocaleTimeString("hu-HU")}
                </li>
                <li>
                  <b>Személyek száma:</b> {reservation.people}
                </li>
                <li>
                  <b>Megjegyzés:</b>
                  <div className="whitespace-pre-line">
                    {reservation.message ?? "Nincs megjegyzés"}
                  </div>
                </li>
              </ul>

              <div className="flex gap-2">
                {reservation.date < new Date() ? (
                  <div>A foglalás már nem módosítható!</div>
                ) : (
                  <>
                    <Button>Módosítás</Button>
                    <Button variant="destructive">Törlés</Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
