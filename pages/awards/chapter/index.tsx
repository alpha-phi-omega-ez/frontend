import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { title } from "@/components/primitives";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import Slider from "react-slick";
import { Image } from "@heroui/react";
import { awards, award_images } from "@/data/chapter_awards";

const AwardImages = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5500,
  };
  return (
    <Slider {...settings}>
      {award_images.map((item, index) => (
        <div key={index}>
          <Image className="w-full" src={item.img} alt={item.alt} />
        </div>
      ))}
    </Slider>
  );
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
      <AwardImages />
      <div className="mt-10">
        <h2 className="text-center text-4xl font-bold mb-4">Highlights</h2>
        {/* I have no idea how to make this part */}
        <Timeline position="alternate-reverse">
          {awards.map(
            (item, index) =>
              index % 2 === 0 && (
                <div key={index}>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <h3>{item.name}</h3>
                      <p>{item.years}</p>
                      <p>From: {item.from}</p>
                      <p>Purpose: {item.purpose}</p>
                    </TimelineContent>
                  </TimelineItem>
                  {index + 1 < awards.length && (
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <h3>{awards[index + 1].name}</h3>
                        <p>{awards[index + 1].years}</p>
                        <p>From: {awards[index + 1].from}</p>
                        <p>Purpose: {awards[index + 1].purpose}</p>
                      </TimelineContent>
                    </TimelineItem>
                  )}
                </div>
              )
          )}
        </Timeline>
      </div>
    </section>
  );
}
