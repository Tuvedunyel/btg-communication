"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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
  return (
    <li key={item.ID}>
      <Link
        href={`/${item.slug}`}
        dangerouslySetInnerHTML={{ __html: item.title }}
      ></Link>
      {childMenu && (
        <ul>
          {childMenu.map((child) => {
            if (child.menu_item_parent === item.ID.toString()) {
              return (
                <li key={child.ID}>
                  <Link
                    href={`/${child.slug}`}
                    dangerouslySetInnerHTML={{ __html: child.title }}
                  ></Link>
                </li>
              );
            }
          })}
        </ul>
      )}
    </li>
  );
};

export default function ListNav({ menu }: { menu: MenuData[] }) {
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
      <nav>
        <ul id="menu-principal">
          {parentMenu.map((item) => (
            <MenuItem item={item} key={item.ID} childMenu={childMenu} />
          ))}
        </ul>
      </nav>
    </div>
  );
}
