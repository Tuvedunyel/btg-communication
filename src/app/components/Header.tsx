import { Cabin } from "next/font/google";
import HeaderFront from "./HeaderFront";
import axios from "axios";
import { use } from "react";
import https from "https";
import ListNav from "./ListNav";
import Rs from "./Rs";
import ContactFront from "./ContactFront";

const cabin = Cabin({ subsets: ["latin"] });
const URL_API = process.env.URL_API;

type Menu = {
  data: {
    ID: number;
    menu_order: number;
    title: string;
    slug: string;
    url: string;
    menu_item_parent: string;
  }[];
};

export type rsOptions = {
  facebook: {
    url: string;
    title: string;
    target: string;
  };
  instagram: {
    url: string;
    title: string;
    target: string;
  };
  linkedin: {
    url: string;
    title: string;
    target: string;
  };
};

export type OptionsType = {
  data: rsOptions;
};

const getOptions = async (): Promise<OptionsType> => {
  const response = await axios<OptionsType, any>(
    `${URL_API}/better-rest-endpoints/v1/options/acf`,
    { httpsAgent: agent }
  );
  return response;
};

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const getMenu = async (): Promise<Menu> => {
  const response = await axios<Menu, any>(
    `${URL_API}/better-rest-endpoints/v1/menus/principal`,
    { httpsAgent: agent }
  );
  return response;
};

export default function Header() {
  const menu = use(getMenu());
  const options = use(getOptions());

  return (
    <>
      <header className={cabin.className}>
        <div className="container">
          <HeaderFront />
        </div>
      </header>
      <div id="overlay-menu" className={cabin.className}>
        <div className="content">
          {menu && <ListNav menu={menu.data} rsOptions={options.data} />}
        </div>
      </div>
      <div id="overlay-contact" className={cabin.className}>
        <section className="content">
          <Rs rsOptions={options.data} showContact={false} />
          <ContactFront />
        </section>
      </div>
    </>
  );
}
