interface ServiceStats {
  title: string;
  average: string;
  hours: string;
  events: string;
  organizations: string;
}

interface CommunityEvents {
  title: string;
  stats: {
    icon: string;
    value: string;
    label: string;
  }[];
}

interface OtherEvents {
  title: string;
  description: string;
  stats: {
    icon: string;
    value: string;
    label: string;
  }[];
}

export const images = [
  {
    img: "/images/Food_Bank.jpg",
    alt: "Produce Sorting at Captial Region Food Bank",
  },
  { img: "/images/can_sorting.jpg", alt: "Bottle and Can Sorting" },
  { img: "/images/Glump_Creation.jpg", alt: "Creating Glump" },
  { img: "/images/Northern_Rivers.jpg", alt: "Painting at Northern Rivers" },
];

export const service_stats: ServiceStats[] = [
  {
    title: "Fall 2024 Service Stats",
    average: "47.7",
    hours: "1717+",
    events: "65",
    organizations: "22+",
  },
  {
    title: "Spring 2024 Service Stats",
    average: "47.7",
    hours: "1717+",
    events: "65",
    organizations: "22+",
  },
];

export const community_events: CommunityEvents[] = [
  {
    title: "RPI Service Day 2024",
    stats: [
      {
        icon: "PersonArmsUp",
        value: "142",
        label: "Attendees",
      },
      {
        icon: "Hourglass",
        value: "438+",
        label: "Service Hours",
      },
      {
        icon: "Door",
        value: "8",
        label: "Organizations",
      },
      {
        icon: "Chart",
        value: "53%",
        label: "Increase in Attendance from last year",
      },
    ],
  },
  {
    title: "Youth Service Day 2024",
    stats: [
      {
        icon: "PersonArmsUp",
        value: "100+",
        label: "Attendees",
      },
      {
        icon: "Hourglass",
        value: "45+",
        label: "Service Hours",
      },
      {
        icon: "PersonHandRaise",
        value: "13+",
        label: "Volunteers",
      },
    ],
  },
  {
    title: "Biggest Meme on Campus 2024",
    stats: [
      {
        icon: "Money",
        value: "$665",
        label: "Funds Raised",
      },
      {
        icon: "Hourglass",
        value: "123.75",
        label: "Service Hours",
      },
      {
        icon: "Door",
        value: "4",
        label: "Organizations",
      },
    ],
  },
  {
    title: "RPI Service Day 2023",
    stats: [
      {
        icon: "PersonArmsUp",
        value: "93",
        label: "Attendees",
      },
      {
        icon: "Hourglass",
        value: "349+",
        label: "Service Hours",
      },
      {
        icon: "Door",
        value: "5",
        label: "Organizations",
      },
      {
        icon: "Chart",
        value: "40%",
        label: "Increase in Attendance from last year",
      },
    ],
  },
];

export const other_events: OtherEvents[] = [
  {
    title: "Underground Railroad Education Center",
    description:
      "Created educational content for their social media to highlight historical artifacts at the education center.",
    stats: [
      {
        icon: "PersonArmsUp",
        value: "10",
        label: "Voluneers",
      },
      {
        icon: "Hourglass",
        value: "50",
        label: "Service Hours",
      },
    ],
  },
];
