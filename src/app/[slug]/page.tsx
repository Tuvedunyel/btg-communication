import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import axios from "axios";
import https from "https";
import { use } from "react";
import Client from "./template-client/Client";
import { Metadata, ResolvingMetadata } from "next";
import he from "he";
import Savoir from "./template-savoir/Savoir";

const URL_API = process.env.URL_API;
const agent = new https.Agent({
  rejectUnauthorized: false,
});

export type TemoignagesType = {
  nom: string;
  job: string;
  societe: string;
  portrait: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  description: string;
  id_video?: string;
};

export type ClientType = {
  temoignage: TemoignagesType[];
  sous_titre: string;
  confiances: {
    image: {
      id: number;
      url: string;
      alt: string;
      width: number;
      height: number;
    };
  }[];
};

export type SavoirType = {
  sous_titre: string;
  image_de_fond: {
    id: number;
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  texte_agence: string;
  texte_accompagnement: string;
  texte_bas_de_page: string;
  lien_agence_tours: {
    url: string;
    title: string;
    target: string;
  };
  lien_agence_vannes: {
    url: string;
    title: string;
    target: string;
  };
  agence_bas_texte: string;
  agence_bas_image: {
    id: number;
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  agence_fond_bleu_texte: string;
  competences: {
    icone: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    titre: string;
    texte: string;
    exemple: string;
    lien_competence: {
      url: string;
      title: string;
      target: string;
    };
  }[];
};

type DataType<T> = {
  id: number;
  title: string;
  contnet: string;
  parent: boolean;
  slug: string;
  template: string;
  acf: T;
  yoast: {
    yoast_wpseo_title: string;
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

export type PageType<T> = DataType<T>;

const getPages = async (
  slug: string
): Promise<PageType<ClientType | SavoirType> | undefined> => {
  try {
    const response = await axios<PageType<ClientType | SavoirType>[], any>(
      `${URL_API}/better-rest-endpoints/v1/pages`,
      { httpsAgent: agent }
    );

    return response.data.find(
      (page: PageType<ClientType | SavoirType>) => page.slug === slug
    );
  } catch (e) {
    console.log(`Page error fetch Page : ${e}`);
  }
};

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;

  const data = await axios<PageType<ClientType | SavoirType>[], any>(
    `${URL_API}/better-rest-endpoints/v1/pages`,
    { httpsAgent: agent }
  ).then((response) =>
    response.data.find(
      (page: PageType<ClientType | SavoirType>) => page.slug === slug
    )
  );

  return {
    title: he.decode(data?.title),
    description: he.decode(data?.yoast.yoast_wpseo_metadesc),
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = use(getPages(slug));

  return (
    <>
      <Header />
      {data?.template === "template-client" && (
        <Client page={data as PageType<ClientType>} />
      )}
      {data?.template === "template-savoir" && (
        <Savoir page={data as PageType<SavoirType>} />
      )}
      <Footer />
    </>
  );
}
