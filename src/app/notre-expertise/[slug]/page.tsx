import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import axios from "axios";
import he from "he";
import Image from "next/image";
import { use } from "react";

export type DomaineType = {
  id: number;
  title: string;
  slug: string;
  content: string;
  acf: {
    sous_titre: string;
    titre: string;
  };
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

export type allDomaineType = DomaineType[];

const URL_API = process.env.URL_API;

const getDomaines = async (
  slug: string
): Promise<{
  data: DomaineType | undefined;
  allData: allDomaineType;
  error: boolean;
}> => {
  try {
    const response = await axios.get(
      `${URL_API}/better-rest-endpoints/v1/domaines`
    );
    return {
      data: response.data.find((domaine: DomaineType) => domaine.slug === slug),
      allData: response.data,
      error: false,
    };
  } catch (e) {
    return { data: undefined, allData: [], error: true };
  }
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await axios(`${URL_API}/better-rest-endpoints/v1/domaines`).then(
    (response) =>
      response.data.find((domaine: DomaineType) => domaine.slug === params.slug)
  );

  return {
    title: he.decode(data?.title),
    description: he.decode(data?.yoast.yoast_wpseo_metadesc),
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data, allData, error } = use(getDomaines(slug));

  return (
    <>
      <Header />
      <main id="expertise">
        <section className="top">
          <div className="container">
            <div
              className="banner"
              style={{
                background: `url(${data?.media["2048x2048"]}) no-repeat top center`,
                backgroundSize: "cover",
              }}
            >
              <Image
                src="/logo-btg-white.svg"
                alt="BTG Communication"
                width={219}
                height={252.86}
              />
              <div className="vague">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 32">
                  <path d="M156.7 32c-9.5 0-14.2-7.7-18.2-14.5-4.4-7.1-7.4-11.5-13.2-11.5-5.7 0-8.8 4.4-13.1 11.5C108.1 24.3 103.5 32 94 32s-14.2-7.7-18.2-14.5C71.4 10.4 68.4 6 62.7 6c-5.7 0-8.8 4.4-13.1 11.5C45.5 24.3 40.9 32 31.3 32s-14.2-7.7-18.2-14.5C8.8 10.4 5.7 6 0 6V0c9.5 0 14.2 7.7 18.2 14.5C22.6 21.6 25.6 26 31.3 26c5.7 0 8.8-4.4 13.1-11.5C48.5 7.7 53.1 0 62.7 0c9.5 0 14.2 7.7 18.2 14.5C85.2 21.6 88.3 26 94 26s8.8-4.4 13.1-11.5C111.2 7.7 115.8 0 125.3 0s14.2 7.7 18.2 14.5c4.3 7.2 7.4 11.5 13.1 11.5s8.8-4.4 13.1-11.5C173.8 7.7 178.5 0 188 0v6c-5.7 0-8.8 4.4-13.1 11.5-4.1 6.8-8.7 14.5-18.2 14.5z"></path>
                </svg>
              </div>
              <h1>{he.decode(data!.title)}</h1>
              <h2>{he.decode(data!.acf.sous_titre)}</h2>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
