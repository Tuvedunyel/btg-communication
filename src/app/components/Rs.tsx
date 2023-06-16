import Image from "next/image";
import { OptionsType } from "./Contact";

type rsOptions = {
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

export default function Rs({ rsOptions }: { rsOptions: rsOptions }) {
  return (
    <ul className="rs">
      <li>
        <a href={rsOptions.facebook.url} target={rsOptions.facebook.target}>
          <span className="screen-reader-text">{rsOptions.facebook.title}</span>
          <Image
            width={48}
            height={56}
            src="/facebook-degrade.svg"
            alt="Logo de Facebook"
          />
        </a>
      </li>
      <li>
        <a href={rsOptions.linkedin.url} target={rsOptions.linkedin.target}>
          <span className="screen-reader-text">{rsOptions.linkedin.title}</span>
          <Image
            width={48}
            height={56}
            src="/linkedin-degrade.svg"
            alt="Logo de Linkedin"
          />
        </a>
      </li>
      <li>
        <a href={rsOptions.instagram.url} target={rsOptions.instagram.target}>
          <span className="screen-reader-text">
            {rsOptions.instagram.title}
          </span>
          <Image
            width={48}
            height={56}
            src="/insta-degrade.svg"
            alt="Logo d'instagram"
          />
        </a>
      </li>
    </ul>
  );
}
