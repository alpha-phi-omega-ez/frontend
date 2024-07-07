import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardBody, Link } from "@nextui-org/react";

export default function AboutPage() {
  const list = [
    {
      title: "Chapter History",
      link: "/about/history",
      description:
        "Learn about the history of our chapter and the service we have provided to the RPI and Capital Region communities",
    },
    {
      title: "Officers",
      link: "/about/officers",
      description: "Meet the brothers that lead our chapter programs",
    },
    {
      title: "Chapter Policies",
      link: "/about/policies",
      description:
        "View the policies that ensure our chapter delivers on our promise to be a meaninful organization at RPI and to our members",
    },
  ];

  return (
    <DefaultLayout>
      <section className="justify-centerpb-4 md:pb-6">
        <div className="text-center">
          <h1 className={title()}>About</h1>
          <p className="mt-5">
            Alpha Phi Omega is a national gender inclusive service fraternity.
            Started in 1925 from the ideals of scouting it has transformed to
            the largest fraternity in the nation with over 300 active chapters
            and 750+ chapters across the nation. Our chapter at RPI was founded
            in 1942 and has provided tons a meaninful service to RPI and the
            capital region for 77 years. We continue to dedciated time and
            effort to assist and improve our local community while also
            developing leaders and enjoying time together as brothers through
            our bonds of brotherhood and fun fellowship events.
          </p>
          <p className="mt-3">
            Our chapter at RPI allows any students to join and participate in
            our programs through our new member period. The period lasts between
            8-10 weeks and guides you through our history, office services, and
            how to participate in our chapter activies. The process has many
            mentorship and leadership activies and opportunities built in to
            help our members grow. It is also filled with many service
            opportunities and many ways to engage with our members through fun
            events.
          </p>
          <p className="mt-3">
            Our chapter also operates an office on the 3rd floor of the Student
            Union (Room 3420) where we run free services including the campus
            Lost and Found, store and allow students to view backtest, and loan
            our chargers and calculators to students.
          </p>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Learn More</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            {list.map((item) => (
              <Card shadow="sm">
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
    </DefaultLayout>
  );
}
