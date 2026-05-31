import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardBody } from "@heroui/card";

import { title } from "@/components/primitives";
import { Events, Semester } from "@/data/recruitment";

export const metadata: Metadata = {
  title: "Recruitment",
};

export default function RecruitmentPage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="relative w-full sm:w-8/12 mx-auto aspect-[3/2]">
        <Image
          src="/images/2024BrothersImg.jpg"
          alt="New Members"
          fill
          className="object-cover rounded-lg"
          sizes="(min-width: 640px) 66vw, 100vw"
          priority
        />
      </div>
      <div className="text-center mt-8">
        <h1 className={title()}>{Semester} Recruitment Events</h1>
      </div>
      <div className="mt-10 mb-8 md:w-9/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {Events.map((item) => (
          <Card key={item.title} shadow="sm">
            <CardBody className="p-4">
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="mt-4">{item.description}</p>
              <p className="mt-4">{item.date}</p>
              <p>{item.time}</p>
              <p>{item.location}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
