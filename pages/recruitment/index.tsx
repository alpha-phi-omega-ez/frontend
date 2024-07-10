import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Image } from "@nextui-org/react";
import { Events, Semester } from "./recruitment";

export default function RecruitmentPage() {
  return (
    <DefaultLayout>
      <Image
        className="sm:w-8/12 mx-auto"
        src="/images/2024BrothersImg.jpg"
        alt="New Members"
      />
      <section className="justify-center pb-4 md:pb-6">
        <div className="text-center mt-8">
          <h1 className={title()}>{Semester} Recruitment Events</h1>
        </div>
        <div className="mt-10 mb-4 md:w-9/12 mx-auto mb-8">
          {Events.map((item, index) => (
            <div key={index} className="mt-8">
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="mt-4">{item.description}</p>
              <p className="mt-4">{item.date}</p>
              <p>{item.time}</p>
              <p>{item.location}</p>
            </div>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
