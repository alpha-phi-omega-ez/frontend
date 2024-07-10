import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Image } from "@nextui-org/react";

export default function JoiningPage() {
  return (
    <DefaultLayout>
      <section className="justify-center pb-4 md:pb-6">
        <div className="text-center">
          <h1 className={title()}>Joining APO</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div>
            <Image
              src="/images/2024_Brothers_Funny.jpg"
              alt="Funny picture with brothers and new members"
            />
            <h2 className="text-2xl mt-4 mb-4 font-bold">New Member Process</h2>
            <p>
              As an individual who has expressed interest in becoming a brother,
              you must go through a new member process. This process is about 8
              weeks to 10 weeks, and it allows you to become acclimated with the
              brotherhood and decide whether or not you want to actually join.
            </p>
            <p className="mt-4">
              As a potential brother, we want to make sure you are comfortable!
              If any personal issues or problems arise during the process, do
              not hesitate to reach out and contact newmembereducators@apoez.org
              or president@apoez.org, or any brother you feel comfortable with.
              During the New Member Process, hazing is not allowed. We take any
              accusations of hazing very seriously. Brothers are not allowed to
              make you do personal favors, and they are not allowed to drink
              with New Members even if both parties are 21 or older. Should any
              concerns arise, we have an anonymous form for reporting these
              issues. You may also email rm@apoez.org.
            </p>
          </div>
          <div>
            <Image
              src="/images/semiformal.jpg"
              alt="Funny picture with brothers and new members"
            />
            <h2 className="text-2xl mt-4 mb-4 font-bold">
              What Happens During the 8-10 Weeks?
            </h2>
            <p>
              During the new member process, individuals will learn how to plan
              and execute service events, complete service hours, learn how to
              run our office, learn how to retrieve and find lost and found from
              campus locations and log them into the system, as well as other
              activities to keep our office running. Each week, the New Members
              will meet with the New Member Educators to learn about the history
              of the brotherhood, and interact with the other potential members
              joining within the semester. Incorporated into the New Member
              Process are group bonding activities. As a Member class, the
              responsibilities are together to plan a service event and an
              on-campus brotherhood party. The brotherhood party will occur
              during the last week of the New Member process, signifying the end
              of the New Member process. At the end of the New Member Process,
              there is a brotherhood wide vote on the New Members and
              initiations for the New Brothers.
            </p>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
