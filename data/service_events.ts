import { ImageType } from "@/components/carousel";

const service_day = "/images/service_day/";
const ysd = "/images/ysd/";
const bmoc = "/images/bmoc/";
const overnighter = "/images/overnighter/";

const ServiceDayImages: ImageType[] = [
  { img: service_day + "RPI_Service_Day(3).jpg", alt: "RPI Service Day" },
  { img: service_day + "RPI_Service_Day(2).jpg", alt: "RPI Service Day" },
  { img: service_day + "RPI_Service_Day(1).jpg", alt: "RPI Service Day" },
  { img: service_day + "RPI_Service_Day(4).jpg", alt: "RPI Service Day" },
  { img: service_day + "RPI_Service_Day(5).jpg", alt: "RPI Service Day" },
  { img: service_day + "RPI_Service_Day(6).jpg", alt: "RPI Service Day" },
  { img: service_day + "RPI_Service_Day(7).jpg", alt: "RPI Service Day" },
  { img: service_day + "RPI_Service_Day(8).jpg", alt: "RPI Service Day" },
  { img: service_day + "RPI_Service_Day(9).jpg", alt: "RPI Service Day" },
  { img: service_day + "RPI_Service_Day(10).jpg", alt: "RPI Service Day" },
  { img: service_day + "RPI_Service_Day(11).jpg", alt: "RPI Service Day" },
];

const YSDImages: ImageType[] = [
  { img: ysd + "YSD(3).jpg", alt: "Youth Service Day" },
  { img: ysd + "YSD(8).jpg", alt: "Youth Service Day" },
  { img: ysd + "YSD(7).jpg", alt: "Youth Service Day" },
  { img: ysd + "YSD(5).jpg", alt: "Youth Service Day" },
  { img: ysd + "YSD(6).jpg", alt: "Youth Service Day" },
  { img: ysd + "YSD(10).jpg", alt: "Youth Service Day" },
  { img: ysd + "YSD(2).jpg", alt: "Youth Service Day" },
  { img: ysd + "YSD(9).jpg", alt: "Youth Service Day" },
  { img: ysd + "YSD(1).jpg", alt: "Youth Service Day" },
  { img: ysd + "YSD(4).jpg", alt: "Youth Service Day" },
];

const BMOCImages: ImageType[] = [
  { img: bmoc + "BMOC(5).jpg", alt: "Biggest Meme on Campus" },
  { img: bmoc + "BMOC(11).jpg", alt: "Biggest Meme on Campus" },
  { img: bmoc + "BMOC(2).jpg", alt: "Biggest Meme on Campus" },
  { img: bmoc + "BMOC(7).jpg", alt: "Biggest Meme on Campus" },
  { img: bmoc + "BMOC(8).jpg", alt: "Biggest Meme on Campus" },
  { img: bmoc + "BMOC(10).jpg", alt: "Biggest Meme on Campus" },
  { img: bmoc + "BMOC(9).jpg", alt: "Biggest Meme on Campus" },
  { img: bmoc + "BMOC(6).jpg", alt: "Biggest Meme on Campus" },
  { img: bmoc + "BMOC(3).jpg", alt: "Biggest Meme on Campus" },
  { img: bmoc + "BMOC(12).jpg", alt: "Biggest Meme on Campus" },
  { img: bmoc + "BMOC(1).jpg", alt: "Biggest Meme on Campus" },
  { img: bmoc + "BMOC(4).jpg", alt: "Biggest Meme on Campus" },
];

const OvernighterImages: ImageType[] = [
  { img: overnighter + "Overnighter(1).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(2).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(3).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(4).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(5).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(6).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(7).jpg", alt: "Overnighter" },
  // { img: overnighter + "Overnighter(8).jpg", alt: "Overnighter" }, Image too large vertically
  { img: overnighter + "Overnighter(9).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(18).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(11).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(12).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(17).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(14).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(13).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(16).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(10).jpg", alt: "Overnighter" },
  { img: overnighter + "Overnighter(15).jpg", alt: "Overnighter" },
];

export const Events = [
  {
    title: "RPI Service Day",
    description:
      "Assist in helping out service organizations with tasks such as cleaning, organizing, and painting. We will have five different service projects, including upkeeping the Sanctuary for Independent Media facilities, can sorting with Mohawk Hudson Humane Society, painting at Northern Rivers, trail maintenance and upkeep at Frear Park, and Card Making on campus!",
    date: "Planned for: Oct 5th, 2024",
    timing: "9:00 am to 2:30 pm",
    location: "Meet at the Union Horseshoe",
    images: ServiceDayImages,
  },
  {
    title: "Youth Service Day",
    description:
      "Every Spring, the APOEZ chapter works with Frear Park to host an Easter Egg Hunt for children in the greater Troy Area! We assist with egg-filling, cleaning the eggs, taking photos at the event, and other coordination.",
    date: "Easter",
    timing: "9:00 am to 2:00 pm",
    location: "Frear Park",
    images: YSDImages,
  },
  {
    title: "Biggest Meme on Campus",
    description:
      "Every Spring, the APOEZ chapter hosts a large-scale fundraising effort for non-profit organizations both locally and nationwide. In this competition, campaigners advocate for their non-profit of choice through postering, tabling, and making some noise. The month of fundraising is ended with debates, the last chance for the RPI community to vote on who they believe is the winner of the biggest meme on campus! All money donated goes to charities.",
    date: "Every Spring leading up to and during GM Week",
    timing: "Tabling throughout the week, debates prior to GM debate",
    location: "RPI Union",
    images: BMOCImages,
  },
  {
    title: "Overnighter",
    description:
      'Every semester, the APOEZ chapter picks a weekend and stays "overnight" at a local camp to assist in facilities maintenance. Common activities include painting, picking up trash alongside trails, drilling, putting together beds, and cleaning.',
    date: "Each Fall and Spring Semesters",
    timing: "Typically the Friday to Sunday",
    location: "YMCA or Scout Camp",
    images: OvernighterImages,
  },
];
