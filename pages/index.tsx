import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardBody } from "@nextui-org/card";
import { Image, Link } from "@nextui-org/react";

const imageBase = "/images/";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="justify-center pb-4 md:pb-6">
        <div className="text-center">
          <h1 className={title()}>Alpha Phi Omega</h1>
          <h2 className="mt-2 text-4xl font-bold">Epsilon Zeta</h2>
          <h2 className={subtitle()}>RPI in Troy, NY</h2>
          <div className="grid md:grid-cols-3 mt-10 gap-4">
            <Card shadow="sm">
              <Image
                src={imageBase + "USS_Slater_Service.jpg"}
                alt="Service at the USS Slater"
              />
              <CardBody className="p-5">
                <h3 className="text-3xl">Service</h3>
                <p className="text-justify mt-2">
                  As a chapter, we serve the campus, community, and beyond! We
                  run the campus lost and found, hold a backtest drive for past
                  exams of different classes (we do not have finals), and have a
                  charger loaner service (with calculators). All of these
                  services are run for free for the RPI community! We host a
                  number of service events with different community
                  organizations in the Greater Central NY area, including but
                  not limited to: Mohawk Hudson Humane Society, Sanctuary,
                  Berkshire Bird Paradise, Joseph's House, Unity House, The
                  Animal Support Project, and Northern Rivers.
                </p>
              </CardBody>
            </Card>
            <Card shadow="sm">
              <Image src={imageBase + "Leadership.jpg"} alt="USS Slater" />
              <CardBody className="p-5">
                <h3 className="text-3xl">Leadership</h3>
                <p className="text-justify mt-2">
                  As an organization, we strive to help our members obtain
                  applicable life skills and teach them how to lead. We have a
                  wide variety of leadership positions open to our members, and
                  you do not need to be a part of our executive board to serve!
                  Our executive board members have a number of sub-positions,
                  referred to as chairships, which allow members to get involved
                  if they do not wish to take on the full responsibility of
                  being an officer.
                </p>
              </CardBody>
            </Card>
            <Card shadow="sm">
              <Image src={imageBase + "Friendship.jpg"} alt="Semiformal" />
              <CardBody className="p-5">
                <h3 className="text-3xl">Friendship</h3>
                <p className="text-justify mt-2">
                  We are a close-knit community of individuals who are
                  passionate about helping others. Our members are friends for
                  life, and maintain their relationships even after they
                  graduate! See our alumni organization,{" "}
                  <Link href="https://www.apoezaa.org/about/" target="_blank">
                    EZAA (Epsilon Zeta Alumni Association)
                  </Link>
                  , for more information about alumni relationships and events
                  and{" "}
                  <Link href="https://linktr.ee/apoenyaa" target="_blank">
                    ENYA (the Alpha Phi Omega Eastern New York Alumni
                    Association)
                  </Link>{" "}
                  to learn about serving with APO after college. As an
                  organization, every semester we host a few events dedicated to
                  engaging our alumni base, connecting graduated brothers with
                  current brothers.
                </p>
              </CardBody>
            </Card>
          </div>
          <div className="text-center mx-auto w-8/12 mt-10">
            <h2 className="text-4xl">What is Alpha Phi Omega?</h2>
            <p className="mt-3">
              Alpha Phi Omega is a gender-inclusive national service fraternity
              affiliated and founded on Boy Scout Principles. As an
              organization, we strive to better our community, campus, country,
              and beyond through serving others and volunteerism, while
              promoting ideals of leadership, friendship, and service amongst
              members. First established on Lafayette's College campus (PA), in
              1925, membership has since grown to over 525,000 members and 325
              chapters nationwide!
            </p>
          </div>
          <div className="mt-10 grid sm:grid-cols-3">
            <div>
              <h3 className="text-2xl font-bold">Contact Us</h3>
              <p className="mt-2">
                Whether you are a community organization and need some
                volunteers, an RPI student looking to utilize our free services,
                or an individual looking for more information on our
                organization, we can help.
              </p>
              <p className="mt-2">
                General Inquires:{" "}
                <Link href="mailto:contact@apoez.org">contact@apoez.org</Link>
              </p>
              <p className="mt-2">
                Questions About Recruitment Events:{" "}
                <Link href="mailto:membership@apoez.org">
                  membership@apoez.org
                </Link>
              </p>
              <p className="mt-2">
                Questions About the New Member Process
                <Link href="mailto:newmembereducators@apoez.org">
                  newmembereducators@apoez.org
                </Link>
              </p>
              <p className="mt-2">
                Office Number:{" "}
                <Link href="tel:518-276-6516">+1 (518)-276-6516</Link>
              </p>
            </div>
            <Image src={imageBase + "Crest.jpg"} alt="APO Crest" />
            <div>
              <h3 className="text-2xl font-bold">History</h3>
              <p className="mt-2">
                The Epsilon Zeta chapter is known for its service to the
                community. Founded in 1947, the Epsilon Zeta chapter was founded
                in RPI's Clubhouse building, current-day Lally Hall. During our
                75+ years we have received the Dean Arno Nowotny, an APO
                national service award, a record breaking 6 times, and the
                Josiah Frank History Award 2 times. We currently run the Lost
                and Found for campus, the Backtest Services, and Charger Loaner
                Service, all free of charge to the community. Click below to
                learn more about our chapter's unique history.
              </p>
              <Link className="mt-2" href="/about/history">
                EZ's History
              </Link>
            </div>
          </div>
          <div className="mt-16">
            <h3 className="text-4xl font-bold py-1 px-4 main-gold-background">
              Be a Leader, Be a Friend, Be of Service
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 my-8 text-left">
              <div className="col-span-2">
                <Image
                  src="/images/2023_Composite.jpg"
                  alt="Chapter Composite"
                />
              </div>
              <div>
                <div>
                  <h3 className="text-2xl">Recruitment</h3>
                  <p className="mt-4">
                    With exception to the summer, we recruit every semester! As
                    a Professional Fraternity on campus, first-semester freshman
                    and individuals from social fraternities and sororities on
                    campus are all eligible to be a part of our New Member
                    Program. If you are interested in joining us, or are unsure,
                    feel free to come to some of our events (non-committal).
                  </p>
                  <Link href="/recruitment" className="mt-2">
                    Our Events!
                  </Link>
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl">Donate</h3>
                  <p className="mt-4">
                    We are a 501(c)(3) nonprofit. To continue having larger
                    service projects like our semesterly Overnighter events, we
                    thrive off of donations from the alumni and the greater
                    community. Click below to donate and see more information as
                    to where your money goes!
                  </p>
                  <Link href="/donate" className="mt-2">
                    Donate Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
