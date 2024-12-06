import { Card, CardBody, Image } from "@nextui-org/react";
import { title } from "@/components/primitives";

const officers = [
  {
    position: "President",
    img: "/images/officers/president.jpg",
    description:
      "The President is in charge of and running the executive committee. They are the chair of brotherhood meetings, executive committee meetings, advisory meetings, and is a member of the alumni association. The president is a representative of APO for the university and coordinates with campus directors and staff. The President is in charge of risk mitigation, chapter awards, and management.",
    name: "Mags Martin",
  },
  {
    position: "Vice President of Service",
    img: "/images/officers/vps.jpg",
    description:
      "The Vice President of Service is in charge of leading the service program. They are a resource to assist brothers in charing events. They plan, execute, and prepare reports for service events, keeping track of participation in the service program. They are in charge of overseeing the annual scholarship for incoming Freshman and execution of large-scale service events such as RPI Service Day, BMOC, and Youth Service Day.",
    name: "Allie Labrecque",
  },
  {
    position: "Vice President of Membership",
    img: "/images/officers/vpm.jpg",
    description:
      "The Vice President of Membership is in charge of developing member requirements for brothers. They are a resource to the brotherhood, assisting in leadership development, retention of brothers, supporting newly inducted brothers in transitioning from a new member to an initiate, creating a set of requirements for transfer brothers, inclusion within the chapter, conflict management, and overseeing the recruitment process at the beginning of the fall and spring semester.",
    name: "Jadyn Baidoo-Davis",
  },
  {
    position: "Vice President of Fellowship",
    img: "/images/officers/vpf.jpg",
    description:
      "The Vice President of Fellowship is in charge of supporting close ties within the brotherhood by leading a fellowship program full of fun, engaging, de-stress events. The Vice President of Fellowship serves as a resource to brothers who wish to plan social events. The Vice President of Fellowship is responsible for events such as a semesterly formal.",
    name: "Zack Gordon",
  },
  {
    position: "Vice President of Finance",
    img: "/images/officers/vpfinance.jpg",
    description:
      "The Vice President of Finance is in charge of crafting the budget, training the Treasurer, managing and recovering chapter debt, filing tax forms, and keeping track of the chapter's accounts.",
    name: "Sara Ann Rochford",
  },
  {
    position: "Treasurer",
    img: "/images/officers/treasurer.jpg",
    description:
      "The Treasurer serves as the assistant to the Vice President of Finance, assisting with issuing reimbursements, fundraising, helping with the budget, managing chapter finances, filing tax forms, and keeping track of chapter accounts and funds. At the end of the semester, the Treasurer will become the Vice President of Finance.",
    name: "James Laun",
  },
  {
    position: "New Member Lead",
    img: "/images/officers/nml.jpg",
    description:
      "The New Member Lead is in charge of the New Member Education Process. They serve as a point of contact for New Member-related conflicts and questions and create New Member requirements. The New Member Lead creates Big-Little pairings (a mentorship program where a current brother is paired with a new member to assist them with the trial period), and appoints at least one other New Member Educator to assist in these duties.",
    name: "Josh Youngbag",
  },
  {
    position: "Office Manager",
    img: "/images/officers/om.jpg",
    description:
      "The Office Manager is in charge of upkeep and maintenance of the chapter office. They organize the cabinet full of backexams, are in charge of our loaner-tech service, cleaning the office if needed, and any other improvements necessary. They administer training materials for running the office, and are in charge of delegating brothers to watch over the office or pick up lost and found from locations on campus.",
    name: "Hannah Nardini",
  },
  {
    position: "Recording Secretary",
    img: "/images/officers/recsec.jpg",
    description:
      "The Recording Secretary is in charge of creating agendas for meetings and taking minutes. They are in charge of the upkeep and maintenance of the website and statistics regarding the service and fellowship programs, keeping track of the members of the brotherhood and their status, and in charge of maintenance of the google workspace and drive.",
    name: "Sam Innes",
  },
  {
    position: "Corresponding Secretary",
    img: "/images/officers/corrsec.jpg",
    description:
      "The Corresponding Secretary is the face of the chapter. They are in charge of external communications and relationships with the alumni association, clubs on RPI's campus, and other nearby APO chapters. They are in charge of planning and executing outward-facing events, coordination for conferences, posts for the social media accounts, distribution of chapter newsletters, development of posters distributed on campus, and anything else dealing with representing APO to the public.",
    name: "Rafael Cenzano",
  },
  {
    position: "Historian",
    img: "/images/officers/historian.jpg",
    description:
      "The historian is in charge of record keeping for the semester of their term as well as preserving the history of the chapter. The historian is responsible for collecting photos of events, running the internal wiki, creating the new-member composite, maintenance of the family tree system, and the chapter composite as well as the semesterly scrapbook.",
    name: "Sara Seelman",
  },
  {
    position: "Sergeant at Arms",
    img: "/images/officers/saa.jpg",
    description:
      "The Sergeant at Arms is responsible for keeping order during meetings, planning and executing chapter ceremonies, maintenance of the chapter storage space, reserving rooms in academic buildings and the student union for chapter use, counting votes during elections, and edits of the chapter bylaws and constitution.",
    name: "Steven Pereira",
  },
];

export default function OfficersPage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center">
        <h1 className={title()}>Meet our Officers</h1>
        <p className="w-85/100 mx-auto mt-4">
          We have 12 positions. Read about them below!
        </p>
      </div>

      <div className="gap-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
        {officers.map((item, index) => (
          <Card key={index} shadow="sm">
            <Image
              shadow="sm"
              width="100%"
              alt={item.position}
              className="w-full object-cover h-[300px] rounded-t-lg"
              src={item.img}
            />
            <CardBody className="p-3">
              <h2 className="text-2xl">{item.position}</h2>
              <h3 className="pt-2 pb-3 text-large">{item.name}</h3>
              <p className="text-default-500 text-justify">
                {item.description}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
