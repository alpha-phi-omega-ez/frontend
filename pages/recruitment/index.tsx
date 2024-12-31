import { title } from "@/components/primitives";
import { Image, Card } from "@nextui-org/react";
import { Events, Semester } from "./recruitment";

export default function RecruitmentPage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <Image
        className="sm:w-8/12 mx-auto"
        src="/images/2024BrothersImg.jpg"
        alt="New Members"
      />
      <div className="text-center mt-8">
        <h1 className={title()}>{Semester} Recruitment Events</h1>
      </div>
      <div className="mt-10 mb-4 md:w-9/12 mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Events.map((item, index) => (
          <Card key={index} className="p-4">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="mt-4">{item.description}</p>
            <p className="mt-4">{item.date}</p>
            <p>{item.time}</p>
            <p>{item.location}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
