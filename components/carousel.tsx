import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Image } from "@heroui/react";

export interface ImageType {
  img: string;
  alt: string;
}

const deafultSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  accessibility: true,
  autoplay: false,
  arrows: true,
};

export default function DefaultCarousel({ images }: { images: ImageType[] }) {
  return (
    <Slider {...deafultSettings}>
      {images.map((item, index) => (
        <div key={index}>
          <Image
            src={item.img}
            alt={item.alt}
            width="100%"
            height="100%"
            className="object-cover"
          />
        </div>
      ))}
    </Slider>
  );
}
