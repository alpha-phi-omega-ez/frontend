import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Image } from "@nextui-org/react";

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

const DefaultCarousel: React.FC<{ images: ImageType[] }> = ({ images }) => {
  return (
    <Slider {...deafultSettings}>
      {images.map((item, index) => (
        <div key={index}>
          <Image className="w-full" src={item.img} alt={item.alt} />
        </div>
      ))}
    </Slider>
  );
};

export default DefaultCarousel;
