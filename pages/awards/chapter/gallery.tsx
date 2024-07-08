import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const images = [
  { img: "/images/APO_Awards.jpg", alt: "2023 Awards" },
  { img: "/images/2004_awards.jpg", alt: "2004 Awards" },
];

const AwardImages = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {images.map((item) => (
        <div>
          <img className="w-full" src={item.img} alt={item.alt} />
        </div>
      ))}
    </Slider>
  );
};

export default AwardImages;
