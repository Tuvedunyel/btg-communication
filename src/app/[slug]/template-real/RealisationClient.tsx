"use client";
import { PageType, RealisationType } from "../page";
import Image from "next/image";
import he from "he";
import { useState } from "react";
import { RealType } from "./Realisation";

export default function RealisationClient({
  page,
  data,
}: {
  page: PageType<RealisationType>;
  data: RealType[];
}) {
  const [filter, setFilter] = useState<string>("all");

  return (
    <div>
      <ul className="categories-filter">
        <li>
          <button
            onClick={() => setFilter("all")}
            className={filter === "all" ? "active" : ""}
          >
            <div className="icon">
              <Image
                src="/filter-tous.svg"
                alt="Tous les filtres"
                height={80}
                width={70}
              />
              <Image
                src="/filter-tous-degrade.svg"
                alt="Tous les filtres"
                height={80}
                width={70}
              />
            </div>
            <Image
              src="/vague.svg"
              alt="Vague"
              width={58.75}
              height={10}
              className="wave"
            />
          </button>
        </li>
        {page.acf.categories.map((category, index: number) => (
          <li key={index}>
            <button
              onClick={(e) => {
                setFilter(category.nom);
              }}
              className={category.nom === filter ? "active" : ""}
            >
              <div className="icon">
                <Image
                  src={category.image.url}
                  alt={category.image.alt}
                  height={80}
                  width={70}
                />
                <Image
                  src={category.image_degrade.url}
                  alt={category.image_degrade.alt}
                  height={80}
                  width={70}
                />
              </div>
              <p>{he.decode(category.nom)}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
