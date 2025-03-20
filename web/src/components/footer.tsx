import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { Anchor } from "./anchor";
import { openingHours } from "~/lib/opening-hours";

const Column: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => (
  <div>
    <h2 className="relative mb-8 text-xl text-white after:absolute after:bottom-[-10px] after:block after:h-[2px] after:w-[50px] after:bg-orange-400">
      {title}
    </h2>
    <ul className="flex flex-col gap-1">{children}</ul>
  </div>
);

const Item: React.FC<{ children: React.ReactNode; href: string }> = ({
  children,
  href,
}) => (
  <li>
    <Anchor href={href} target="_blank">
      {children}
    </Anchor>
  </li>
);

const Icon: React.FC<{
  children: React.ReactNode;
  href: string;
  title: string;
}> = ({ children, href, title }) => (
  <Link
    className="grid h-10 w-10 place-items-center rounded-full bg-neutral-700 text-white transition-colors hover:bg-white hover:text-zinc-900"
    title={title}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </Link>
);

const OpeningHours: React.FC = () => (
  <>
    <li className="mt-4">Nyitvatartás:</li>

    <ul>
      <li>
        H-P: {openingHours.weekDays.open}:00 - {openingHours.weekDays.close}
        :00
      </li>
      <li>
        Sz-V: {openingHours.weekend.open}:00 - {openingHours.weekend.close}
        :00
      </li>
    </ul>
  </>
);

export const Footer: React.FC = () => (
  <footer className="row-start-2 bg-zinc-900 px-6 py-16 text-neutral-200">
    <div className="grid w-fit gap-x-16 gap-y-8 sm:mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Column title="Burger Bár - Angyalföld">
        <li>1133 Bp., Random utca 12</li>
        <Item href="mailto:angyalfold@burger-bar.hu">
          angyalfold@burger-bar.hu
        </Item>
        <Item href="tel:+3611111111">Tel: +36 1 111 1111</Item>
        <li>Fax: +36 1 111 1111</li>

        <OpeningHours />
      </Column>

      <Column title="Burger Bár - Újpest">
        <li>1045 Bp., Példa út 23</li>
        <Item href="mailto:ujpest@burger-bar.hu">ujpest@burger-bar.hu</Item>
        <Item href="tel:+3612222222">Tel: +36 1 222 2222</Item>
        <li>Fax: +36 1 222 2222</li>

        <OpeningHours />
      </Column>

      <Column title="Burger Bár - Buda">
        <li>1016 Bp., Véletlen krt. 26.</li>
        <Item href="mailto:buda@burger-bar.hu">buda@burger-bar.hu</Item>
        <Item href="tel:+3613333333">Tel: +36 1 333 3333</Item>
        <li>Fax: +36 1 333 3333</li>

        <OpeningHours />
      </Column>

      <Column title="Tanúsítványok">
        <li>HLH | ISO 9001:2015</li>
        <li className="flex items-center gap-2">
          <Image
            src="/iso.jpg"
            alt="ISO QSCert 9001"
            title="ISO QSCert 9001"
            width={57}
            height={70}
          />
          <Image src="/mkt.jpg" alt="MKT" title="MKT" width={97} height={29} />
        </li>
      </Column>

      <div className="col-span-full flex flex-col justify-between gap-4 font-light text-neutral-200 sm:flex-row sm:items-center">
        <div className="flex flex-col">
          <p>&#169;2025 Burger Bár Zrt.</p>
          <div className="flex gap-2">
            <Anchor href="/adatkezeles">Adatkezelési tájékozatató</Anchor>
            <Anchor href="/impresszum">Impresszum</Anchor>
          </div>
        </div>

        <div className="flex gap-2">
          <Icon href="https://www.facebook.com" title="Facebook">
            <FaFacebookF />
          </Icon>

          <Icon href="https://hu.linkedin.com" title="Linkedin">
            <FaLinkedinIn />
          </Icon>

          <Icon href="mailto:hello@burger-bar.hu" title="E-mail">
            <FaEnvelope />
          </Icon>

          <Icon href="tel:+3611111111" title="Telefon">
            <FaPhoneAlt />
          </Icon>
        </div>
      </div>
    </div>
  </footer>
);
