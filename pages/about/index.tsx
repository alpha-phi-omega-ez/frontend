import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import History from "./history";
import Officers from "./officers";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 pb-4 md:pb-6">
        <div className="text-center">
          <h1 className={title()}>About Us</h1>
          <p className="w-85/100 mx-auto mt-4">
            The main mission of Alpha Phi Omega is to create inclusive
            communities for a more peaceful world by developing leaders, uniting
            members through friendship and rendering service to all. Read about
            EZ's history as we continue to strive to serve the campus, community
            and beyond.
          </p>
        </div>
      </section>
      <History />
      <section className="flex flex-col items-center justify-center gap-4 pb-4 md:pb-6 mt-10">
        <div className="text-center">
          <h1 className={title()}>Meet our Officers</h1>
          <p className="w-85/100 mx-auto mt-4">
            We have 12 positions. Read about them below!
          </p>
        </div>
      </section>
      <Officers />
    </DefaultLayout>
  );
}
