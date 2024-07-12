import { Card, CardBody, Image } from "@nextui-org/react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

const history = [
  {
    title: "The Founding of the Chapter",
    img: "/images/new_club_house.jpg",
    description:
      "The prior hub of student activities, Lally Hall (formerly known as the RPI Clubhouse) is where the origins of Epsilon Zeta started. On May 11, 1947 at 2:30 pm, RPI faculty members, Boy Scout Executives, National Executives, and 42 charter members joined together to establish the new chapter. Many of these charter members were World War II veterans. In this meeting, Russell Olsen was elected President, Walter Locher became Vice President, Peter Gundlefinger became secretary, and John Thompson was elected treasurer.",
  },
  {
    title: "Early Days and Service",
    img: "/images/early_days_and_service.jpg",
    description:
      "Starting in 1947, brothers gave up one meal per week, and used the money toward CARE packages that supplied Europeans food in the aftermath of World War II. This year also marked the development and maintenance of the campus-wide lost-and-found by the brotherhood. Other early service projects included building a field hospital at Rotary Scout Reservation, blood donations, and cleanup of Vanderhayden Hall. In 1949, the used-book exchange, a service where students donated old textbooks to be reused, was established. In the fall of 1954, the chapter rebuilt the dam at Camp Kiwanis near East Poestenkill. The Meanest Man on Campus (MMOC) competition and fundraiser started in 1958. Faculty, staff and students campaigned as members of the RPI community voted for their preferred MMOC contestant by donating money.",
  },
  {
    title: "Modern-Day EZ",
    img: "/images/service_day/RPI_Service_Day(3).jpg",
    description:
      "In the 1960's, the chapter's office moved from the Clubhouse to the newly-constructed Student Union. A women's auxiliary group was established, allowing on-campus women to participate in the service program. In 1976, women were officially allowed to join Alpha Phi Omega and granted membership. Notable projects included building a ramp outside of the home of a 15-year-old cerebral palsy victim who could not walk, creating punch cards for the Folsom Library's books, raising over $8,000 at a walk for the mentally handicapped, and fixing up the Approach. Today, Epsilon Zeta continues to provide services to the campus, community and country. A scholarship program grants a $650 award to four incoming freshmen who demonstrate outstanding service and leadership skills. For our service, we have earned notable awards and recognition, including the Nowotny Service Award (x6), the Josiah Frank Historian's Award (x2), and the M. R. Disborough Service to Scouting Award.",
  },
];

export default function HistoryPage() {
  return (
    <DefaultLayout>
      <section className="justify-center pb-4 md:pb-6">
        <div className="text-center">
          <h1 className={title()}>About Us</h1>
          <p className="w-85/100 mx-auto mt-4">
            The main mission of Alpha Phi Omega is to create inclusive
            communities for a more peaceful world by developing leaders, uniting
            members through friendship and rendering service to all. Read about
            EZ's history as we continue to strive to serve the campus, community
            and beyond.
          </p>
        </div>
      </section>
      {history.map((item, index) => (
        <Card key={index} className="pb-4 my-4">
          <CardBody className="overflow-visible">
            <div className="flex justify-center">
              <Image
                alt={item.title}
                className="object-cover rounded-xl w-full"
                src={item.img}
              />
            </div>
            <h2 className="font-bold text-2xl px-2 pt-4">{item.title}</h2>
            <p className="text-justify px-2 pt-2">{item.description}</p>
          </CardBody>
        </Card>
      ))}
    </DefaultLayout>
  );
}
