import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import axios from "axios";
import { use } from "react";
import he from "he";
import Image from "next/image";
import AcfImage from "./AcfImage";
const URL_API = process.env.URL_API;

export type ImageContentType = {
  acf_fc_layout: string;
  image: {
    id: number;
    url: string;
    alt: string;
    width: number;
    height: number;
  };
};

export type TextContentType = {
  acf_fc_layout: string;
  texte: string;
};

type ACFType<T> = {
  poster_string: {
    id: number;
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  content: T[];
  accroche: string;
  url_client: string;
};

export type RealType = {
  id: number;
  title: string;
  slug: string;
  date: string;
  acf: ACFType<ImageContentType | TextContentType>;
  excerpt: string;
  content: string;
  author: string;
  yoast: {
    yoast_wpseo_metadesc: string;
  };
  media: {
    thumbnail: string;
    medium: string;
    medium_large: string;
    large: string;
    "1536x1536": string;
    "2048x2048": string;
  };
};

const getRealisation = async (slug: string) => {
  try {
    const response = await axios.get(
      `${URL_API}/better-rest-endpoints/v1/realisations`
    );
    return response.data.find((real: RealType) => real.slug === slug);
  } catch (e) {
    console.log(`Realisation error fetch Realisation : ${e}`);
  }
};

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = use(getRealisation(slug));

  return (
    <>
      <Header />
      <main id="realisations">
        <section className="banner">
          <div className="container">
            <Image
              src={data.acf.poster_single.url}
              alt={data.acf.poster_single.alt}
              width={data.acf.poster_single.width}
              height={data.acf.poster_single.height}
            />
          </div>
        </section>
        <section className="top">
          <div className="container">
            <h1>{he.decode(data.title)}</h1>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: data.content }}
            ></div>
            <div
              className="accroche"
              dangerouslySetInnerHTML={{ __html: data.acf.accroche }}
            ></div>
            <Image
              src="/wave-radiant.gif"
              alt="Vague en dégradé"
              width={188}
              height={37}
              className="wave-radiant"
            />
          </div>
        </section>
        <section className="acf-layouts">
          <div className="container">
            <ul>
              {data.acf.content.map(
                (item: ImageContentType | TextContentType, index: number) => (
                  <li key={index}>
                    {item.acf_fc_layout === "image" ? (
                      <AcfImage image={item} />
                    ) : (
                      ""
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
