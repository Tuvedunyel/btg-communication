import Image from "next/image";
import { PageType, SavoirType } from "../page";
import he from "he";
import Link from "next/link";
import ListSavoir from "./ListSavoir";

export default function Savoir({ page }: { page: PageType<SavoirType> }) {
  return (
    <main id="savoir">
      <section
        className="banner"
        style={{
          background: `url('${page.media["2048x2048"]}') no-repeat top center `,
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
      <section className="agence">
        <div className="container">
          <Image
            src={page.acf.image_de_fond.url}
            alt={page.acf.image_de_fond.alt}
            width={page.acf.image_de_fond.width}
            height={page.acf.image_de_fond.height}
          />
          <div
            className="right"
            style={{ height: `${page.acf.image_de_fond.height}px` }}
          >
            <div className="supperpo">
              <h2>L&apos;agence</h2>
              <div
                dangerouslySetInnerHTML={{ __html: page.acf.texte_agence }}
              ></div>
              <ul className="link">
                <li>
                  <Link href="/">
                    {he.decode(page.acf.lien_agence_tours.title)}
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    {he.decode(page.acf.lien_agence_vannes.title)}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-accomp">
              <div
                dangerouslySetInnerHTML={{
                  __html: page.acf.texte_accompagnement,
                }}
              ></div>
              <Link href="/" className="link-equipe">
                L&apos;équipe à votre écoute
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
            </div>
          </div>
        </div>
      </section>
      <ListSavoir competences={page.acf.competences} />
      <section className="bottom">
        <div className="container">
          <Image
            src={page.acf.agence_bas_image.url}
            alt={page.acf.agence_bas_image.alt}
            width={page.acf.agence_bas_image.width}
            height={page.acf.agence_bas_image.height}
          />
          <div
            className="bottom-text"
            dangerouslySetInnerHTML={{ __html: page.acf.agence_bas_texte }}
          ></div>
        </div>
      </section>
    </main>
  );
}
