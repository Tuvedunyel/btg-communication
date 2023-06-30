"use client";

import Image from "next/image";
import { PageType, TemoignagesType } from "./page";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const MediaPlayer = (
  temoin: TemoignagesType,
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>
) => {
  return (
    <>
      {showModal && (
        <section id="media">
          <div className="container">
            <button onClick={() => setShowModal(false)}>
              Retour aux références
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default function Client({ page }: { page: PageType }) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const MediaPlayer = (temoin: TemoignagesType) => {
    return (
      <>
        {showModal && (
          <section id="media">
            <div className="container">
              <button onClick={() => setShowModal(false)}>
                Retour aux références
              </button>
            </div>
          </section>
        )}
      </>
    );
  };
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
          <h1 dangerouslySetInnerHTML={{ __html: page.title }}></h1>
          <p
            dangerouslySetInnerHTML={{ __html: page.acf.sous_titre }}
            className="sub-title"
          ></p>
        </div>
      </section>
      <section className="experiences">
        <h2>Ils ont fait l&apos;expérience</h2>
        <ul className="clients">
          {page.acf.temoignage.map((temoin, index) => (
            <li key={index}>
              <div className={temoin.id_video ? "photo video" : "photo"}>
                <Image
                  src={temoin.portrait.url}
                  alt={temoin.portrait.alt}
                  width={temoin.portrait.width}
                  height={temoin.portrait.height}
                />
              </div>
              <h3>
                {temoin.nom}
                <span>{temoin.job}</span>
                {temoin.societe}
              </h3>
              <Image
                src="/wave-radiant.gif"
                alt="Vague en dégradé"
                className="wave-radiant"
                width={82}
                height={15}
              />
              <div className="desc">
                <p>{temoin.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
