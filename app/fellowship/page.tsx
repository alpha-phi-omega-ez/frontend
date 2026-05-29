import type { Metadata } from "next";
import Image from "next/image";

import { title } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Fellowship",
};

const images = [
  {
    img: "/images/PNMCD.jpg",
    alt: "Post New Member Ceremony Dinner",
  },
  {
    img: "/images/Formal.jpg",
    alt: "Formal",
  },
  {
    img: "/images/Go_Karting.jpg",
    alt: "Go Karting",
  },
  {
    img: "/images/Ice_Skating.jpg",
    alt: "Ice Skating",
  },
];

export default function FellowshipPage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center">
        <h1 className={title()}>Fellowship</h1>
        <p className="mt-5">
          Building friendship and community amongst members is what makes EZ
          feel like a family. Our Vice President of Fellowship focuses on
          building a fun, positive environment through their programs and
          events. Maintenance of the chapter environment is supported with 9
          separate chairships: Intramurals, Formal, Sunshine, Apparels, Book
          Club, Minecraft, Art Club, Esports, and External Fellowship, coined
          APOutreach (Co-chairship with the Corresponding Secretary).
        </p>
        <p className="mt-5">
          Intramurals is our sports team that participates in club competitions
          on RPI&apos;s campus. We currently play soccer, volleyball, table
          tennis, and spikeball. Our team, APOcalypse is open to any member of
          the RPI community to join, and we have a number of friends involved
          intramurally that are not brothers. Sunshine is responsible for
          overall good vibes and positivity within the chapter. They host
          de-stress events, determine brother of the week, and have lighthearted
          slides at brotherhood meetings. Apparels is in charge of creating
          chapter merchandise, specifically attire, and coordinates lettermaking
          events for brothers. Minecraft plans fellowship play events and
          maintains the server.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-6">
        {images.map((item) => (
          <div key={item.alt} className="relative w-full h-64 shadow-sm">
            <Image
              alt={item.alt}
              src={item.img}
              fill
              className="object-cover rounded-t-lg"
              sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
