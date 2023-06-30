import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import axios from "axios";
import https from "https";
import Image from "next/image";
import { use } from "react";
import Client from "./Client";

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

type PagesType = {
  data: PageType[];
};

type DataType = {
  id: number;
  title: string;
  slug: string;
  template: string;
  acf: {
    temoignage: TemoignagesType[];
    sous_titre: string;
  };
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

export type PageType = DataType;

const getPages = async (slug: string): Promise<PageType | undefined> => {
  try {
    const response = await axios<PagesType, any>(
      `${URL_API}/better-rest-endpoints/v1/pages`,
      { httpsAgent: agent }
    );

    return response.data.find((page: PageType) => page.slug === slug);
  } catch (e) {
    console.log(`Page error fetch Page : ${e}`);
  }
};

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = use(getPages(slug));

  return (
    <>
      <Header />
      {data?.template === "template-client" && <Client page={data} />}
      <Footer />
    </>
  );
}
