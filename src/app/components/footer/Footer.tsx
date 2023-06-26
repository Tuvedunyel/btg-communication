import Image from "next/image";
import Newsletter from "./Newsletter";
import Map from "./Map";

export default function Footer() {
  return (
    <footer>
      <Newsletter />
      <Map />
      <section className="informations"></section>
    </footer>
  );
}
