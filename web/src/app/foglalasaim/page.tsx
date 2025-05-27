import { type NextPage } from "next";
import { createMetadata } from "~/lib/create-metadata";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Title } from "~/components/title";
import { db } from "~/server/db";
import { reservations } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const metadata = createMetadata({
  path: "/foglalasaim",
  title: "Faglalásaim",
  description: "Burger Bár - Foglalásaim",
});

const Page: NextPage = async () => {
  const authObject = await auth();
  const user = await currentUser();

  if (!user) return authObject.redirectToSignIn();

  const userReservations = await db
    .select()
    .from(reservations)
    .where(eq(reservations.userId, user.id));

  return (
    <main className="my-12 flex flex-col items-center gap-12 px-6">
      <Title>Foglalásaim</Title>

      <section className="flex w-full flex-col gap-2">
        <div>
          Szia <b>{user?.lastName}!</b>
        </div>

        <div>
          {userReservations.map((reservation) => (
            <div key={reservation.id}>
              <div>
                <b>Foglalás ID:</b> {reservation.id}
              </div>
              <div>
                <b>User ID:</b> {user?.id}
              </div>
              <div>
                <b>Dátum:</b> {new Date(reservation.date).toLocaleDateString()}
              </div>
              <div>
                <b>Időpont:</b>{" "}
                {new Date(reservation.date).toLocaleTimeString()}
              </div>
              <div>
                <b>Személyek száma:</b> {reservation.people}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
