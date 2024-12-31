import { Card, CardBody, Image } from "@nextui-org/react";
import { title } from "@/components/primitives";
import { officers } from "./officers";

export default function OfficersPage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center">
        <h1 className={title()}>Meet our Officers</h1>
        <p className="w-85/100 mx-auto my-5">
          We have 12 positions. Read about them below!
        </p>
      </div>

      <div className="gap-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
        {officers.map((item, index) => (
          <Card key={index} shadow="sm">
            <Image
              shadow="sm"
              width="100%"
              alt={item.position}
              className="w-full object-cover h-[300px] rounded-t-lg"
              src={item.img}
            />
            <CardBody className="p-3">
              <h2 className="text-2xl">{item.position}</h2>
              <h3 className="pt-2 pb-3 text-large">{item.name}</h3>
              <p className="text-default-500 text-justify">
                {item.description}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
