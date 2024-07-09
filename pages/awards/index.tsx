import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardBody, Link } from "@nextui-org/react";

const pages = [
  {
    title: "Chapter Awards",
    link: "/awards/chapter",
    description:
      "Learn about the history of our chapter and the service we have provided to the RPI and Capital Region communities",
  },
  {
    title: "Individual Awards",
    link: "/awards/individual",
    description: "Meet the brothers that lead our chapter programs",
  },
];

export default function AwardsPage() {
  return (
    <DefaultLayout>
      <section className="justify-centerpb-4 md:pb-6">
        <div className="text-center">
          <h1 className={title()}>Awards</h1>
          <p className="mt-5">
            Our chapter has many recognitions and awards for our service as a
            chapter and awards for individuals who have contributed a lot to our
            chapter.
          </p>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Learn More</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-5">
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
    </DefaultLayout>
  );
}
