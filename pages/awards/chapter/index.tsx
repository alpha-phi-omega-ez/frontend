import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import AwardImages from "./carousel";
import { awards } from "./awards";

export default function ChapterAwardsPage() {
  return (
    <DefaultLayout>
      <section className="justify-center pb-4 md:pb-6">
        <div className="text-center">
          <h1 className={title()}>Chapter Awards</h1>
          <p className="mt-5 mb-3">
            Throughout 75+ years of existence, the Epsilon Zeta chapter has been
            recognized by a number of local organizations and APO nationals for
            achievement to our community, campus, and country. Our most notable
            achievement is winning the Dean Arno Nowotny National Service Award
            6x. Below are our other notable achievements.
          </p>
        </div>
        <AwardImages />
        <div className="mt-10">
          <h2 className="text-center text-4xl font-bold mb-4">Highlights</h2>
          {/* I have no idea how to make this part */}
          <Timeline position="alternate-reverse">
            {awards.map(
              (item, index) =>
                index % 2 === 0 && (
                  <div key={index}>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <h3>{item.name}</h3>
                        <p>{item.years}</p>
                        <p>From: {item.from}</p>
                        <p>Purpose: {item.purpose}</p>
                      </TimelineContent>
                    </TimelineItem>
                    {index + 1 < awards.length && (
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <h3>{awards[index + 1].name}</h3>
                          <p>{awards[index + 1].years}</p>
                          <p>From: {awards[index + 1].from}</p>
                          <p>Purpose: {awards[index + 1].purpose}</p>
                        </TimelineContent>
                      </TimelineItem>
                    )}
                  </div>
                )
            )}
          </Timeline>
        </div>
      </section>
    </DefaultLayout>
  );
}
