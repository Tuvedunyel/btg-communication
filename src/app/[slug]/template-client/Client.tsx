"use client";

import Image from "next/image";
import { ClientType, PageType, TemoignagesType } from "../page";
import Temoin from "./Temoin";
import he from "he";
import Link from "next/link";

export default function Client({ page }: { page: PageType<ClientType> }) {
  return (
    <main id="client">
      <section
        className="banner"
        style={{
          background: `url('${page.media["2048x2048"]}') no-repeat top center`,
          backgroundSize: "cover",
        }}
      >
        <Image
          src="/logo-btg-white.svg"
          alt="BTG Communication logo"
          width={219}
          height={253}
        />
        <div className="vague">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 188 32"
            style={{ fill: "white" }}
          >
            <path d="M156.7 32c-9.5 0-14.2-7.7-18.2-14.5-4.4-7.1-7.4-11.5-13.2-11.5-5.7 0-8.8 4.4-13.1 11.5C108.1 24.3 103.5 32 94 32s-14.2-7.7-18.2-14.5C71.4 10.4 68.4 6 62.7 6c-5.7 0-8.8 4.4-13.1 11.5C45.5 24.3 40.9 32 31.3 32s-14.2-7.7-18.2-14.5C8.8 10.4 5.7 6 0 6V0c9.5 0 14.2 7.7 18.2 14.5C22.6 21.6 25.6 26 31.3 26c5.7 0 8.8-4.4 13.1-11.5C48.5 7.7 53.1 0 62.7 0c9.5 0 14.2 7.7 18.2 14.5C85.2 21.6 88.3 26 94 26s8.8-4.4 13.1-11.5C111.2 7.7 115.8 0 125.3 0s14.2 7.7 18.2 14.5c4.3 7.2 7.4 11.5 13.1 11.5s8.8-4.4 13.1-11.5C173.8 7.7 178.5 0 188 0v6c-5.7 0-8.8 4.4-13.1 11.5-4.1 6.8-8.7 14.5-18.2 14.5z"></path>
          </svg>
        </div>
        <div className="title">
          <h1>{he.decode(page.title)}</h1>
          <p className="sub-title">{he.decode(page.acf.sous_titre)}</p>
        </div>
      </section>
      <section className="experiences">
        <h2>Ils ont fait l&apos;expérience</h2>
        <ul className="clients">
          {page.acf.temoignage.map((temoin: TemoignagesType, index: number) => (
            <Temoin temoin={temoin} index={index} key={index} />
          ))}
        </ul>
        <Link href="/" className="real">
          <p>Les réalisations de l&apos;agence</p>
          <svg
            className="arrow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            x="0px"
            y="0px"
          >
            <title>Arrows</title>
            <g data-name="Layer 2">
              <polygon points="44.13 72.13 58 86 94.25 50 57.87 13.13 44 27 57.51 41 6 41 6 59 57.51 59 44.13 72.13"></polygon>
            </g>
          </svg>
        </Link>
      </section>
      <section className="trust-us">
        <div className="container">
          <h2>Ils nous font confiance :</h2>
          <ul className="confiances">
            {page.acf.confiances.map((client, index: number) => (
              <li key={index}>
                <Image
                  src={client.image.url}
                  alt={client.image.alt}
                  width={client.image.width}
                  height={client.image.height}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="contact-us">
        <div className="container">
          <h2>Et vous ?</h2>
          <a href="mailto:contact@btg-communication.fr">
            <span className="screen-reader-text">
              contact@btg-communication.fr
            </span>
            <Image
              src="/contact-degrade.svg"
              alt="Nous contacter à contacter@btg-communication.fr"
              width={75}
              height={86.59}
            />
          </a>
        </div>
      </section>
    </main>
  );
}
