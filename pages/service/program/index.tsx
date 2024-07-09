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
import DefaultLayout from "@/layouts/default";
import { Card, CardBody, Link, Image } from "@nextui-org/react";

const images = [
  {
    img: "/images/Food_Bank.jpg",
    alt: "Produce Sorting at Captial Region Food Bank",
  },
  { img: "/images/can_sorting.jpg", alt: "Bottle and Can Sorting" },
  { img: "/images/Glump_Creation.jpg", alt: "Creating Glump" },
  { img: "/images/Northern_Rivers.jpg", alt: "Painting at Northern Rivers" },
];

export default function ServicePage() {
  return (
    <DefaultLayout>
      <section className="justify-center pb-4 md:pb-6">
        <div className="text-center">
          <h1 className={title()}>Service Program</h1>
          <p className="mt-5">
            As an Alpha Phi Omega chapter, we strive to further our community,
            campus, and country through service. Our organization and Vice
            President of Service focus on building a strong program, filled with
            external collaborations and at least two service events per week.
            The responsibilities of our service program are further delegated
            into 9 separate chairships: Biggest Meme on Campus (BMOC), Freshman
            Community Service Scholarship, External Service (Co-chairship with
            the Corresponding Secretary), National Service Week, Scouting, RPI
            Service Day (Fall), Youth Service Day (Spring), Alumni Service
            (Co-chairship with Corresponding Secretary), and Community Day
            (Co-run by Union Executive Board).{" "}
            <Link href="https://bmoc.apoez.org/" target="_blank">
              BMOC
            </Link>{" "}
            is responsible for coordinating our large-scale fundraising effort
            for non-profit organizations both locally and nationwide. This event
            is fully planned by the chapter, requiring communications with RPI
            Union, UPAC, and other organizations and people on campus. RPI
            Service Day is a campus event that coordinates with about 4 or 5
            local organizations and sends student volunteers. This event is
            fully chapter-run, and requires communicating with RPI admin, the
            Union, Sodexo, and local partners. Larger events, such as RPI
            Service Day or BMOC, often require sub-chairs for effective
            coordination. Youth Service Day is a Easter-Egg Hunt Service Event
            planned with Frear Park for the local Troy community. The Freshman
            Community Service Scholarship chair is responsible for organizing
            submission information, creating and postering flyers, picking a
            reviewing committee, and communicating with the potential awardees.
            Community Day is similar to RPI Service Day, but is planned by the
            Union Executive Board. Community Day has not fully made a comeback
            since covid. Alumni Service plans events with{" "}
            <Link href="https://www.apoezaa.org/about/" target="_blank">
              EZAA
            </Link>{" "}
            (Our chapter's Alumni Association), and External Service plans
            events with on campus organizations as well as small, RPI public
            events. Each individual chairship allows our chapter to fulfill our
            greater purpose of "more people doing more service". Find more
            information and photos from some of our events{" "}
            <Link href="/service/events" target="_blank">
              here
            </Link>
            !
          </p>
          <p className="mt-3">
            We currently partner with local organizations such as Captial Region
            Scouting America, Northern Rivers, Joseph's House, Underground
            Railroad Education Center, Mohawk Hudson Marathon, Berkshire Bird
            Paradise, USS Slater, Regional Food Bank of Northeastern New York,
            The Sanctuary for Independent Media, Homeward Bound Dog Shelter,
            YMCA, Frear Park, Habitat for Humanity, and Mohawk Hudson Humane
            Society. On campus, we work with Circle K, Habitat for Humanity Club
            at RPI, Society of Women Engineers, Rensselaer Pride Alliance,
            Disabled Students at RPI, Food Recovery Network, Active Minds, and
            Sunrise, and have in the past collaborated with Engineers Without
            Borders. This past year we have made a number of exciting records
            and hope to continue extending our reach to RPI and the greater
            Capital Region community! Below are some statistics and information
            about our service program, service hours, and events.
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
      </section>
      <section className="text-center mb-4">
        <h2 className="text-2xl font-bold">Spring 2024 Service Stats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="mx-auto">
            <PersonArmsUp
              className="mx-auto justify-center main-blue-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">47.7</h3>
            <p>Average Voting Member Hours</p>
          </div>
          <div className="mx-auto">
            <Hourglass
              className="mx-auto justify-center main-blue-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">1717+</h3>
            <p>Service Hours</p>
          </div>
          <div className="mx-auto">
            <Calendar
              className="mx-auto justify-center main-blue-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">65</h3>
            <p>Unique Events</p>
          </div>
          <div className="mx-auto">
            <Door
              className="mx-auto justify-center main-blue-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">22+</h3>
            <p>Volunteer Organizations</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-6">Fall 2023 Service Stats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="mx-auto">
            <PersonArmsUp
              className="mx-auto justify-center main-blue-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">64.8</h3>
            <p>Average Voting Member Hours</p>
          </div>
          <div className="mx-auto">
            <Hourglass
              className="mx-auto justify-center main-blue-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">2182+</h3>
            <p>Service Hours</p>
          </div>
          <div className="mx-auto">
            <Calendar
              className="mx-auto justify-center main-blue-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">67</h3>
            <p>Unique Events</p>
          </div>
          <div className="mx-auto">
            <Door
              className="mx-auto justify-center main-blue-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">17+</h3>
            <p>Volunteer Organizations</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-6">Community Events</h2>
        <h3 className="text-xl font-bold mt-6">Sept 10, 2023 Service Day</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="mx-auto">
            <PersonArmsUp
              className="mx-auto justify-center main-gold-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">93</h3>
            <p>Atendees</p>
          </div>
          <div className="mx-auto">
            <Hourglass
              className="mx-auto justify-center main-gold-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">349+</h3>
            <p>Service Hours</p>
          </div>
          <div className="mx-auto">
            <Door
              className="mx-auto justify-center main-gold-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">4</h3>
            <p>Organizations</p>
          </div>
          <div className="mx-auto">
            <Chart
              className="mx-auto justify-center main-gold-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">40%</h3>
            <p>Increase in Attendance from last year</p>
          </div>
        </div>
        <h3 className="text-xl font-bold mt-6">
          March 31, 2024 Youth Service Day
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
          <div className="mx-auto">
            <PersonArmsUp
              className="mx-auto justify-center main-gold-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">100+</h3>
            <p>Atendees</p>
          </div>
          <div className="mx-auto">
            <Hourglass
              className="mx-auto justify-center main-gold-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">45+</h3>
            <p>Service Hours</p>
          </div>
          <div className="mx-auto">
            <PersonHandRaise
              className="mx-auto justify-center main-gold-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">13+</h3>
            <p>Volunteers</p>
          </div>
        </div>
        <h3 className="text-xl font-bold mt-6">Sept 10, 2023 Service Day</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
          <div className="mx-auto">
            <Money
              className="mx-auto justify-center main-gold-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">$665</h3>
            <p>Raised</p>
          </div>
          <div className="mx-auto">
            <Hourglass
              className="mx-auto justify-center main-gold-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">123.75</h3>
            <p>Service Hours</p>
          </div>
          <div className="mx-auto">
            <Door
              className="mx-auto justify-center main-gold-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">4</h3>
            <p>Organizations</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-6">Other Large Events</h2>
        <h3 className="text-xl font-bold mt-6">
          Underground Railroad Education Center
        </h3>
        <p className="mt-3">
          Created educational content for their social media to highlight
          historical artifacts at the education center.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="mx-auto">
            <PersonHandRaise
              className="mx-auto justify-center main-gold-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">10</h3>
            <p>Volunteers</p>
          </div>
          <div className="mx-auto">
            <Hourglass
              className="mx-auto justify-center main-gold-background rounded-full p-2 mb-2"
              size={70}
            />
            <h3 className="text-xl font-bold">50</h3>
            <p>Service Hours</p>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
