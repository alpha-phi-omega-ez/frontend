import Image from "next/image";
import { Card, CardBody } from "@heroui/card";
import { title } from "@/components/primitives";
import { officers } from "@/data/officers";

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
            <div className="relative w-full h-[300px]">
              <Image
                alt={item.position}
                src={item.img}
                fill
                className="object-cover rounded-t-lg"
                loading={index < 3 ? "eager" : "lazy"}

                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
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

