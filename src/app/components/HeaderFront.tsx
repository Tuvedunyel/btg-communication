"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function HeaderFront() {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="logo">
        <Link href="/" title="Retour à l'accueil">
          <Image
            src="/logo-btg.svg"
            width={64}
            height={36}
            alt="Logo de BTG communication"
            quality={80}
          />
        </Link>
      </div>
      <strong>- Le bureau très graphique -</strong>
      <div className="menu">
        <p>menu</p>
        <div id="menu-img" ref={menuRef}>
          <div className="front-face">
            <Image
              src="/menu.svg"
              alt="Ouvrir le menu"
              width={50}
              height={50}
              quality={85}
            />
          </div>
          <div className="back-face">
            <Image
              src="/close-menu.svg"
              alt="Fermer le menu"
              width={50}
              height={50}
              quality={85}
            />
          </div>
        </div>
      </div>
    </>
  );
}
