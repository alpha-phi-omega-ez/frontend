import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import styled from "@emotion/styled";

export const HistoryDesc = styled.p`
  text-align: justify;
`;

export const HistoryTitle = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
`;

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 pb-4 md:pb-6">
        <div className="text-center">
          <h1 className={title()}>About</h1>
          <p className="w-85/100 mx-auto mt-4">
            The main mission of Alpha Phi Omega is to create inclusive
            communities for a more peaceful world by developing leaders, uniting
            members through friendship and rendering service to all. Read about
            EZ's history as we continue to strive to serve the campus, community
            and beyond.
          </p>
        </div>
      </section>
      <Card className="pb-4 my-4">
        <CardBody className="overflow-visible">
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full"
            src="/images/new_club_house.jpg"
          />
          <HistoryTitle className="font-bold text-xl px-2 pt-4">
            The Founding of the Chapter
          </HistoryTitle>
          <HistoryDesc className="px-2 pt-2">
            The prior hub of student activities, Lally Hall (formerly known as
            the RPI Clubhouse) is where the origins of Epsilon Zeta started. On
            May 11, 1947 at 2:30 pm, RPI faculty members, Boy Scout Executives,
            National Executives, and 42 charter members joined together to
            establish the new chapter. Many of these charter members were World
            War II veterans. In this meeting, Russell Olsen was elected
            President, Walter Locher became Vice President, Peter Gundlefinger
            became secretary, and John Thompson was elected treasurer.
          </HistoryDesc>
        </CardBody>
      </Card>
      <Card className="pb-4 my-4">
        <CardBody className="overflow-visible">
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full"
            src="/images/early_days_and_service.jpg"
          />
          <HistoryTitle className="font-bold text-xl px-2 pt-4">
            Early Days and Service
          </HistoryTitle>
          <HistoryDesc className="px-2 pt-2">
            Starting in 1947, brothers gave up one meal per week, and used the
            money toward CARE packages that supplied Europeans food in the
            aftermath of World War II. This year also marked the development and
            maintenance of the campus-wide lost-and-found by the brotherhood.
            Other early service projects included building a field hospital at
            Rotary Scout Reservation, blood donations, and cleanup of
            Vanderhayden Hall. In 1949, the used-book exchange, a service where
            students donated old textbooks to be reused, was established. In the
            fall of 1954, the chapter rebuilt the dam at Camp Kiwanis near East
            Poestenkill. The Meanest Man on Campus (MMOC) competition and
            fundraiser started in 1958. Faculty, staff and students campaigned
            as members of the RPI community voted for their preferred MMOC
            contestant by donating money.
          </HistoryDesc>
        </CardBody>
      </Card>
      <Card className="pb-4 my-4">
        <CardBody className="overflow-visible">
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full"
            src="/images/serviceday2023.jpg"
          />
          <HistoryTitle className="font-bold text-xl px-2 pt-4">
            Modern-Day EZ
          </HistoryTitle>
          <HistoryDesc className="px-2 pt-2">
            In the 1960's, the chapter's office moved from the Clubhouse to the
            newly-constructed Student Union. A women's auxiliary group was
            established, allowing on-campus women to participate in the service
            program. In 1976, women were officially allowed to join Alpha Phi
            Omega and granted membership. Notable projects included building a
            ramp outside of the home of a 15-year-old cerebral palsy victim who
            could not walk, creating punch cards for the Folsom Library's books,
            raising over $8,000 at a walk for the mentally handicapped, and
            fixing up the Approach. Today, Epsilon Zeta continues to provide
            services to the campus, community and country. A scholarship program
            grants a $650 award to four incoming freshmen who demonstrate
            outstanding service and leadership skills. For our service, we have
            earned notable awards and recognition, including the Nowotny Service
            Award (x6), the Josiah Frank Historian's Award (x2), and the M. R.
            Disborough Service to Scouting Award.
          </HistoryDesc>
        </CardBody>
      </Card>
    </DefaultLayout>
  );
}
