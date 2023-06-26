import Image from "next/image";

export default function Map() {
  return (
    <section id="map">
      <div className="hexa-top">
        <Image src="/hexa-white.svg" alt="Hexagone" fill={true} />
      </div>
      <div className="map-background">
        <Image
          src="/adresse-btg-communication.jpg"
          alt="52 Boulevard Heurteloup, 37000 Tours"
          fill={true}
          quality={75}
        />
      </div>
      <div className="hexa-bottom">
        <Image src="/hexa-white.svg" alt="Hexagone" fill={true} />
      </div>
    </section>
  );
}
