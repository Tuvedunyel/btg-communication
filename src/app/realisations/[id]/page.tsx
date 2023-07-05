import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import axios from "axios";
import { use } from "react";
import he from "he";
import Image from "next/image";
const URL_API = process.env.URL_API;

type ImageContentType = {
  acf_fc_layout: string;
  image: {
    id: number;
    url: string;
    alt: string;
    width: number;
    height: number;
  };
};

type TextContentType = {
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

const getRealisation = async (id: string) => {
  try {
    const response = await axios.get(
      `${URL_API}/better-rest-endpoints/v1/realisations/${id}`
    );
    return response.data;
  } catch (e) {
    console.log(`Realisation error fetch Realisation : ${e}`);
  }
};

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = use(getRealisation(id));

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
      </main>
      <Footer />
    </>
  );
}
