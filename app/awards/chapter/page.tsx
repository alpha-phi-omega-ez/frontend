import type { Metadata } from "next";

import DefaultCarousel from "@/components/carousel";
import { title } from "@/components/primitives";
import { awards, award_images } from "@/data/chapter_awards";

export const metadata: Metadata = {
  title: "Chapter Awards",
};

export default function ChapterAwardsPage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center">
        <h1 className={title()}>Chapter Awards</h1>
        <p className="mt-5 mb-3">
          Throughout 75+ years of existence, the Epsilon Zeta chapter has been
          recognized by a number of local organizations and APO nationals for
          achievement to our community, campus, and country. Our most notable
          achievement is winning the Dean Arno Nowotny National Service Award
          6 times. Below are our other notable achievements.
        </p>
      </div>
      <div className="mx-auto w-full max-w-5xl">
        <DefaultCarousel
          images={award_images}
          settings={{
            dots: false,
            autoplay: true,
            arrows: false,
            autoplaySpeed: 5500,
            pauseOnHover: false,
            pauseOnFocus: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          }}
          aspectRatioClassName="aspect-[16/9]"
        />
      </div>
      <div className="mt-10">
        <h2 className="text-center text-4xl font-bold mb-4">Highlights</h2>
        <div className="relative mx-auto max-w-4xl">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-default-300"
            aria-hidden
          />
          {awards.map((item, index) => {
            const isRight = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative mb-8 flex w-full ${
                  isRight ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className="absolute left-1/2 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-primary"
                  aria-hidden
                />
                <div
                  className={`w-[calc(50%-1.5rem)] px-2 ${
                    isRight ? "text-left" : "text-right"
                  }`}
                >
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>{item.years}</p>
                  <p>From: {item.from}</p>
                  <p>Purpose: {item.purpose}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
