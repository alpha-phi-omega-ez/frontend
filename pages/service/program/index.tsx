import {
  Calendar,
  Chart,
  Door,
  Hourglass,
  Money,
  PersonArmsUp,
  PersonHandRaise,
} from "@/components/icons";
import { title } from "@/components/primitives";
import { Link, Image } from "@heroui/react";
import {
  images,
  service_stats,
  community_events,
  other_events,
} from "@/data/service_program";
import { IconSvgProps } from "@/types";

type IconWithTextProps = {
  Icon: React.FC<IconSvgProps>;
  value: string;
  label: string;
  color?: "blue" | "yellow";
};

const IconWithText = ({ Icon, label, value, color }: IconWithTextProps) => (
  <div className="flex flex-col items-center">
    <div
      className={`flex items-center justify-center w-16 h-16 ${
        color === "blue" ? "main-blue-background" : "main-gold-background"
      } rounded-full`}
    >
      <Icon size={40} />
    </div>
    <h3 className="text-xl font-bold mt-2">{value}</h3>
    <p>{label}</p>
  </div>
);

export default function ServiceProgramPage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center">
        <h1 className={title()}>Service Program</h1>
        <p className="mt-5">
          As an Alpha Phi Omega chapter, we strive to further our community,
          campus, and country through service. Our organization and Vice
          President of Service focus on building a strong program, filled with
          external collaborations and at least two service events per week. The
          responsibilities of our service program are further delegated into 9
          separate chairships: Biggest Meme on Campus (BMOC), Freshman Community
          Service Scholarship, External Service (Co-chairship with the
          Corresponding Secretary), National Service Week, Scouting, RPI Service
          Day (Fall), Youth Service Day (Spring), Alumni Service (Co-chairship
          with Corresponding Secretary), and Community Day (Co-run by Union
          Executive Board).{" "}
          <Link href="https://bmoc.apoez.org/" target="_blank">
            BMOC
          </Link>{" "}
          is responsible for coordinating our large-scale fundraising effort for
          non-profit organizations both locally and nationwide. This event is
          fully planned by the chapter, requiring communications with RPI Union,
          UPAC, and other organizations and people on campus. RPI Service Day is
          a campus event that coordinates with about 4 or 5 local organizations
          and sends student volunteers. This event is fully chapter-run, and
          requires communicating with RPI admin, the Union, Sodexo, and local
          partners. Larger events, such as RPI Service Day or BMOC, often
          require sub-chairs for effective coordination. Youth Service Day is a
          Easter-Egg Hunt Service Event planned with Frear Park for the local
          Troy community. The Freshman Community Service Scholarship chair is
          responsible for organizing submission information, creating and
          postering flyers, picking a reviewing committee, and communicating
          with the potential awardees. Community Day is similar to RPI Service
          Day, but is planned by the Union Executive Board. Community Day has
          not fully made a comeback since covid. Alumni Service plans events
          with{" "}
          <Link href="https://www.apoezaa.org/about/" target="_blank">
            EZAA
          </Link>{" "}
          (Our chapter&apos;s Alumni Association), and External Service plans
          events with on campus organizations as well as small, RPI public
          events. Each individual chairship allows our chapter to fulfill our
          greater purpose of &quot;more people doing more service&quot;. Find
          more information and photos from some of our events{" "}
          <Link href="/service/events" target="_blank">
            here
          </Link>
          !
        </p>
        <p className="mt-3">
          We currently partner with local organizations such as Captial Region
          Scouting America, Northern Rivers, Joseph&apos;s House, Underground
          Railroad Education Center, Mohawk Hudson Marathon, Berkshire Bird
          Paradise, USS Slater, Regional Food Bank of Northeastern New York, The
          Sanctuary for Independent Media, Homeward Bound Dog Shelter, YMCA,
          Frear Park, Habitat for Humanity, and Mohawk Hudson Humane Society. On
          campus, we work with Circle K, Habitat for Humanity Club at RPI,
          Society of Women Engineers, Rensselaer Pride Alliance, Disabled
          Students at RPI, Food Recovery Network, Active Minds, and Sunrise, and
          have in the past collaborated with Engineers Without Borders. This
          past year we have made a number of exciting records and hope to
          continue extending our reach to RPI and the greater Capital Region
          community! Below are some statistics and information about our service
          program, service hours, and events.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {images.map((item, index) => (
          <Image
            key={index}
            shadow="sm"
            width="100%"
            alt={item.alt}
            className="w-full object-cover rounded-t-lg"
            src={item.img}
          />
        ))}
      </div>

      <section className="text-center mb-4 mt-6">
        <h2 className="text-4xl font-bold my-6">Service Stats</h2>
        {service_stats.map((item, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold mt-2">{item.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
              <IconWithText
                color="blue"
                Icon={PersonArmsUp}
                value={item.average}
                label="Average Active Member Hours"
              />
              <IconWithText
                color="blue"
                Icon={Hourglass}
                value={item.hours}
                label="Service Hours"
              />
              <IconWithText
                color="blue"
                Icon={Calendar}
                value={item.events}
                label="Unique Events"
              />
              <IconWithText
                color="blue"
                Icon={Door}
                value={item.organizations}
                label="Volunteer Organizations"
              />
            </div>
          </div>
        ))}
        <h2 className="text-4xl font-bold mt-6">Community Events</h2>
        {community_events.map((event, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold mt-6">{event.title}</h3>
            <div
              className={`grid gap-4 mt-8 ${
                event.stats.length === 1
                  ? "grid-cols-1"
                  : event.stats.length === 2
                  ? "grid-cols-2"
                  : event.stats.length === 3
                  ? "grid-cols-3"
                  : "grid-cols-2 sm:grid-cols-4"
              } justify-center`}
            >
              {event.stats.map((stat, statIndex) => {
                const IconComponent =
                  {
                    PersonArmsUp,
                    Hourglass,
                    Door,
                    Chart,
                    Money,
                    PersonHandRaise,
                  }[stat.icon] || (() => <div>Icon not found</div>);
                return (
                  <IconWithText
                    key={statIndex}
                    color="yellow"
                    Icon={IconComponent}
                    value={stat.value}
                    label={stat.label}
                  />
                );
              })}
            </div>
          </div>
        ))}
        <h2 className="text-2xl font-bold mt-6">Other Large Events</h2>
        {other_events.map((event, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold mt-6">{event.title}</h3>
            <p className="mt-3">{event.description}</p>
            <div
              className={`grid gap-4 mt-8 ${
                event.stats.length === 1
                  ? "grid-cols-1"
                  : event.stats.length === 2
                  ? "grid-cols-2"
                  : event.stats.length === 3
                  ? "grid-cols-3"
                  : "grid-cols-2 sm:grid-cols-4"
              } justify-center`}
            >
              {event.stats.map((stat, statIndex) => {
                const IconComponent =
                  {
                    PersonArmsUp,
                    Hourglass,
                    Door,
                    Chart,
                    Money,
                    PersonHandRaise,
                  }[stat.icon] || (() => <div>Icon not found</div>);
                return (
                  <IconWithText
                    key={statIndex}
                    color="yellow"
                    Icon={IconComponent}
                    value={stat.value}
                    label={stat.label}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
