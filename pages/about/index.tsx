import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import History from "./history";
import Officers from "./officers";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <section className="justify-centerpb-4 md:pb-6">
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
      <section className="justify-centerpb-4 md:pb-6">
        <div className="text-center">
          <h1 className={title()}>Meet our Officers</h1>
          <p className="w-85/100 mx-auto mt-4">
            We have 12 positions. Read about them below!
          </p>
        </div>
      </section>
      <Officers />
      <section className="justify-centerpb-4 md:pb-6">
        <div className="text-center">
          <h1 className={title()}>Bylaws & Constitution</h1>
        </div>
      </section>
      <div className="gap-5 grid sm:grid-cols-1 md:grid-cols-2 mb-5">
        <div>
          <iframe
            src="/pdfs/Chapter_Bylaws.pdf"
            width="100%"
            height="550px"
            className="mt-6 mb-4"
          ></iframe>
        </div>
        <div>
          <iframe
            src="/pdfs/Chapter_Constitution.pdf"
            width="100%"
            height="550px"
            className="mt-6 mb-4"
          ></iframe>
        </div>
      </div>
    </DefaultLayout>
  );
}
