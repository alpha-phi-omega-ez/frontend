import type { Metadata } from "next";
import Image from "next/image";

import { title } from "@/components/primitives";
import { recipients } from "@/data/scholarship_recipients";

export const metadata: Metadata = {
  title: "Freshman Service Scholarship",
};

export default function ScholarshipPage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center">
        <h1 className={title()}>Fall Freshman Scholarship Award</h1>
        <p className="mt-5"></p>
      </div>
      <p className="mb-4">
        The APO Community Service Award was started in the 1975-76 school year
        at RPI to celebrate the Institute&apos;s 150th anniversary. The award is
        given to incoming freshman students who had shown exemplary service and
        extracurricular activities in High School. 1995 was the last time the
        scholarship was awarded for almost ten years, due to the difficulty in
        obtaining and going through hundreds or thousands of RPI Admissions
        records. In 2003, the scholarship was started again by brother Alyssa
        Pasquale and restructured as an essay contest. A committee of brothers
        decide which of the four essays are the best, and each winner is awarded
        a sum of $650.
      </p>
      <p>
        Our Fall 2024 applications have closed! This page will be updated when
        details for the Fall 2025 scholarship opens.
      </p>
      <div>
        <h2 className="text-4xl font-bold mt-10 text-center">
          Past Recipients
        </h2>
        {recipients.map((year) => (
          <div key={year.year} className="my-5">
            <h3 className="text-3xl font-bold my-5 text-center">{year.year}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {year.recipients.map((recipient) => (
                <div key={recipient.name} className="text-center my-3">
                  {"img" in recipient ? (
                    <div className="flex justify-center">
                      <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden">
                        <Image
                          src={recipient.img!}
                          alt={recipient.name}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48">
                      <p className="mt-2 font-bold">{recipient.name}</p>
                    </div>
                  )}
                  {"img" in recipient && (
                    <p className="mt-2 font-bold">{recipient.name}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
