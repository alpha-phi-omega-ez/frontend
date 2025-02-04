import { title } from "@/components/primitives";
import { Card, CardBody, Link } from "@heroui/react";

const pages = [
  {
    title: "Community Events",
    link: "/service/events",
    description: "Learn about our public events",
  },
  {
    title: "Service Program",
    link: "/service/program",
    description: "Learn about of nationally recognized service program",
  },
];

export default function ServicePage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center">
        <h1 className={title()}>Service</h1>
        <p className="mt-5">
          Alpha Phi Omega is a national gender inclusive service fraternity. Our
          chapter has been a strong service organization for over 75+ years
          being recoginzed nationally in the fraternity 6 times for having the
          strongest and best balanced service program. We have hundreds of
          events a year completing thousands of hours. Our events fall under
          these 4 categories: Chapter, Campus, Community, and Country with the
          majority of events falling under Campus and Community.
        </p>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Learn More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {pages.map((item, index) => (
            <Card key={index} shadow="sm">
              <Link href={item.link}>
                <CardBody>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2">{item.description}</p>
                </CardBody>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
