import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import Image from "next/image";

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
  arrows: true,
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
  return (
    <Slider {...defaultSettings} {...settings}>
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
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}
