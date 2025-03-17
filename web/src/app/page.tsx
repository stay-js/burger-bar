import { type NextPage } from "next";
import { createMetadata } from "~/lib/create-metadata";

export const metadata = createMetadata({
  path: "",
  title: "Home",
  description: "A hely, ahol a legfinomabb hamburgereket készítjük.",
});

const Page: NextPage = () => (
  <main>
    <h1 className="text-center">Home</h1>
  </main>
);

export default Page;
