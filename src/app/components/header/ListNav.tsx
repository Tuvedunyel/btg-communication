"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { rsOptions } from "./Header";
import Rs from "./Rs";
import he from "he";

type MenuData = {
  ID: number;
  menu_order: number;
  title: string;
  slug: string;
  url: string;
  menu_item_parent: string;
};

const MenuItem = ({
  item,
  childMenu,
}: {
  item: MenuData;
  childMenu?: MenuData[];
}) => {
  const childRef = useRef<HTMLUListElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, item: MenuData) => {
    if (
      childMenu!.some((child) => child.menu_item_parent === item.ID.toString())
    ) {
      e.preventDefault();
      (e.target as HTMLElement).classList.toggle("open");
      childRef.current!.classList.toggle("open");
    }
  };

  return (
    <li
      key={item.ID}
      className={
        childMenu!.some(
          (child) => child.menu_item_parent === item.ID.toString()
        )
          ? "has-children"
          : ""
      }
      onClick={(e) => handleClick(e, item)}
    >
      <Link href={`/${item.slug}`}>{he.decode(item.title)}</Link>
      {childMenu && (
        <ul id="subMenu" ref={childRef}>
          {childMenu.map((child) => {
            if (child.menu_item_parent === item.ID.toString()) {
              return (
                <li key={child.ID}>
                  <Link href={`/notre-expertise/${child.slug}`}>
                    {he.decode(child.title)}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      )}
    </li>
  );
};

export default function ListNav({
  menu,
  rsOptions,
}: {
  menu: MenuData[];
  rsOptions: rsOptions;
}) {
  const [childMenu, setChildMenu] = useState<MenuData[]>([]);
  const [parentMenu, setParentMenu] = useState<MenuData[]>([]);

  useEffect(() => {
    const child = menu.filter((item) => item.menu_item_parent !== "0");
    const parent = menu.filter((item) => item.menu_item_parent === "0");
    setChildMenu(child);
    setParentMenu(parent);
  }, [menu]);

  return (
    <div className="list-nav">
      <div className="vague">
        <Image
          src="/wave-yellow.gif"
          alt="vague jaune"
          width={188}
          height={32}
          quality={75}
        />
      </div>
      <nav className="menu-nav">
        <ul id="menu-principal">
          {parentMenu.map((item) => (
            <MenuItem item={item} key={item.ID} childMenu={childMenu} />
          ))}
        </ul>
        <Rs rsOptions={rsOptions} showContact={true} />
      </nav>
    </div>
  );
}
