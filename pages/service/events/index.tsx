import { title } from "@/components/primitives";
import DefaultCarousel from "@/components/carousel";
import { Events } from "@/data/service_events";

export default function ServiceEventsPage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center">
        <h1 className={title()}>Large Service Events</h1>
        <p className="mt-5">
          Every semester, APO hosts a number of large-scale events to help the
          local community.
        </p>
      </div>
      <div className="mt-10">
        {Events.map((item, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-6 pb-14">
            <div className="md:w-11/12">
              <h2 className="text-3xl mb-2">{item.title}</h2>
              <p className="mb-4">{item.description}</p>
              <p className="mb-1">{item.date}</p>
              <p className="mb-1">{item.timing}</p>
              <p className="mb-1">{item.location}</p>
            </div>
            <div>
              <DefaultCarousel {...item.images} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
