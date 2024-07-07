import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { DSKS, OLAS } from "./recipients";

export default function AwardsPage() {
  return (
    <DefaultLayout>
      <section className="justify-center pb-4 md:pb-6">
        <div className="text-center">
          <h1 className={title()}>Individual Awards</h1>
          <p className="mt-5">
            As a chapter, our 75+ years of existence would be nothing without
            the contributions and sacrifices of our brothers. We give the
            Distinguished Service Key and the Outstanding Leadership Awards to
            tell our members just how much we appreciate their hard work.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div>
            <h2 className="text-lg font-semibold mb-3">
              Chapter Distinguished Service Key
            </h2>
            <p className="text-justify">
              This honour is given to brothers who has distinguished themselves
              through outstanding service to their chapter. These brothers have
              made significant contributions to the service program and
              exemplify leadership, friendship, and service. Chapter DSKs are
              often presented at a chapter banquet or semiformal. Below is a
              list of past recipients of the DSK from our chapter starting with
              the most recent:
            </p>
            <table className="table-auto my-5">
              <thead>
                <tr className="text-left">
                  <th>Name</th>
                  <th>Year Awarded</th>
                </tr>
              </thead>
              <tbody>
                {DSKS.map((recipient) => (
                  <tr className="">
                    <td className="pr-10 pt-2">{recipient.name}</td>
                    <td>{recipient.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">
              Outstanding Leadership Award
            </h2>
            <p className="text-justify">
              Revived again in Fall 2022, the Outstanding Leadership award was
              developed to honour our brothers who have made contributions to
              the chapter. This award was made to celebrate those who, while not
              earning a DSK, were still important to the running of the chapter
              at large. Below is a list of past recipients of the Outstanding
              Leadership Award from our chapter starting with the most recent:
            </p>
            <table className="table-auto my-5">
              <thead>
                <tr className="text-left">
                  <th>Name</th>
                  <th>Year Awarded</th>
                </tr>
              </thead>
              <tbody>
                {OLAS.map((recipient) => (
                  <tr className="">
                    <td className="pr-10 pt-2">{recipient.name}</td>
                    <td>{recipient.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
