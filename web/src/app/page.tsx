import { type NextPage } from "next";
import { createMetadata } from "~/utils/create-metadata";

export const metadata = createMetadata({
  path: "",
  title: "Home",
  description:
    "Burger Bár - A hely, ahol a legfinomabb hamburgereket készítjük.",
});

const Page: NextPage = () => (
  <main className="grid h-screen place-items-center">
    <h1>Burger Bár</h1>
  </main>
);

export default Page;
