import Link from "next/link";

type MenuData = {
  ID: number;
  menu_order: number;
  title: string;
  slug: string;
  url: string;
  menu_item_parent: string;
};

export default function ListNav({ menu }: { menu: MenuData[] }) {
  return (
    <div className="list-nav">
      <div className="vague"></div>
      <nav>
        <ul id="menu-principal">
          {menu.map((item) => {
            if (item.menu_item_parent === "0" && item.slug !== "#") {
              return (
                <li key={item.ID}>
                  <Link
                    href={`/${item.slug}`}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  ></Link>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </div>
  );
}
