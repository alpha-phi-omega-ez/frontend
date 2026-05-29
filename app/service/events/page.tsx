import type { Metadata } from "next";

import { title } from "@/components/primitives";
import DefaultCarousel from "@/components/carousel";
import { Events } from "@/data/service_events";

export const metadata: Metadata = {
  title: "Large Service Events",
};

export default function ServiceEventsPage() {
  return (
    <section className="justify-center overflow-x-clip pb-4 md:pb-6">
      <div className="text-center">
        <h1 className={title()}>Large Service Events</h1>
        <p className="mt-5">
          Every semester, APO hosts a number of large-scale events to help the
          local community.
        </p>
      </div>
      <div className="mt-10 overflow-x-clip">
        {Events.map((item, index) => (
          <div key={index} className="grid min-w-0 gap-6 pb-14 md:grid-cols-2">
            <div className="min-w-0 md:w-11/12">
              <h2 className="text-3xl mb-2">{item.title}</h2>
              <p className="mb-4">{item.description}</p>
              <p className="mb-1">{item.date}</p>
              <p className="mb-1">{item.timing}</p>
              <p className="mb-1">{item.location}</p>
            </div>
            <div className="min-w-0 max-w-full">
              <DefaultCarousel
                images={item.images}
                aspectRatioClassName="aspect-[16/9]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
