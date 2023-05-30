import Image from "next/image";
import Link from "next/link";
import { Cabin } from "next/font/google";
import HeaderFront from "./HeaderFront";
import axios, { AxiosResponse } from "axios";
import { use } from "react";

const cabin = Cabin({ subsets: ["latin"] });
const URL_API = process.env.URL_API;

const getMenu = async (): Promise<
  {
    ID: number;
    menu_order: number;
    title: string;
    slug: string;
    url: string;
    menu_item_parent: number;
  }[]
> => {
  const response = await axios<
    {
      ID: number;
      menu_order: number;
      title: string;
      slug: string;
      url: string;
      menu_item_parent: number;
    }[],
    any
  >(`${URL_API}/better-rest-endpoints/v1/menus/principal`);
  return response;
};

export default function Header() {
  const menu = use(getMenu());

  return (
    <header className={cabin.className}>
      <div className="container">
        <HeaderFront />
      </div>
    </header>
  );
}
