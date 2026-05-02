"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import Image from "next/image";
import { useRef } from "react";

export interface ImageType {
  img: string;
  alt: string;
}

const defaultSettings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  accessibility: true,
  autoplay: false,
  arrows: false,
  swipe: true,
};

interface CarouselProps {
  images: ImageType[];
  settings?: Settings;
  aspectRatioClassName?: string;
}

export default function DefaultCarousel({
  images,
  settings,
  aspectRatioClassName = "aspect-[16/9]",
}: CarouselProps) {
  const sliderRef = useRef<Slider | null>(null);

  if (!images?.length) {
    return (
      <div
        className={`relative w-full max-w-full overflow-hidden rounded-lg bg-default-100 ${aspectRatioClassName}`}
      />
    );
  }

  return (
    <div className="relative w-full max-w-full min-w-0 [&_.slick-list]:overflow-hidden [&_.slick-track]:flex [&_.slick-track]:items-stretch [&_.slick-slide>div]:h-full [&_.slick-dots]:bottom-2">
      <Slider ref={sliderRef} {...defaultSettings} {...settings}>
        {images.map((item, index) => (
          <div key={index}>
            <div
              className={`relative w-full overflow-hidden rounded-lg ${aspectRatioClassName}`}
            >
              <Image
                src={item.img}
                alt={item.alt}
                fill
                sizes="(min-width: 1280px) 960px, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </Slider>

      {images.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-2">
          <button
            type="button"
            aria-label="Previous image"
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-lg font-semibold text-white"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            &lt;
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-lg font-semibold text-white"
            onClick={() => sliderRef.current?.slickNext()}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
