import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Image } from "@nextui-org/react";
import { Events, Semester } from "./recruitment";
import { Bell } from "@/components/icons";

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
        <div className="mt-10 mb-4 sm:w-10/12 mx-auto">
          {Events.map(
            (item, index) =>
              index % 2 === 0 && (
                <div key={index}>
                  <div className="mt-6 grid sm:grid-cols-2">
                    <div>
                      <Bell
                        className="mx-auto justify-center main-blue-background rounded-full p-2 mb-2"
                        size={100}
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl">{item.title}</h2>
                      <p className="mt-4">{item.description}</p>
                      <p className="mt-4">{item.date}</p>
                      <p>{item.time}</p>
                      <p>{item.location}</p>
                    </div>
                  </div>
                  {index + 1 < Events.length && (
                    <div className="mt-6 grid sm:grid-cols-2">
                      <div>
                        <h2 className="text-2xl">{Events[index + 1].title}</h2>
                        <p className="mt-4">{Events[index + 1].description}</p>
                        <p className="mt-4">{Events[index + 1].date}</p>
                        <p>{Events[index + 1].time}</p>
                        <p>{Events[index + 1].location}</p>
                      </div>
                      <div>
                        <Bell
                          className="mx-auto justify-center main-blue-background rounded-full p-2 mb-2"
                          size={100}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
