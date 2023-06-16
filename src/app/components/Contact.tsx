import axios from "axios";
import https from "https";
import ContactFront from "./ContactFront";
import { use } from "react";
import Rs from "./Rs";

const URL_API = process.env.URL_API;

export type OptionsType = {
  data: {
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
};

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const getOptions = async (): Promise<OptionsType> => {
  const response = await axios<OptionsType, any>(
    `${URL_API}/better-rest-endpoints/v1/options/acf`,
    { httpsAgent: agent }
  );
  return response;
};

export default function Contact() {
  const options = use(getOptions());

  return (
    <section className="content">
      <Rs rsOptions={options.data} />
      <ContactFront />
    </section>
  );
}
