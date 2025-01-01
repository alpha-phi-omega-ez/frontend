interface Recipient {
  name: string;
  img?: string;
}

interface Year {
  year: number;
  recipients: Recipient[];
}

export const recipients: Year[] = [
  {
    year: 2024,
    recipients: [
      {
        name: "Ella Snyder",
        img: "/images/scholarship/2024/Ella_Snyder.jpg",
      },
      {
        name: "Ethan Gray",
        img: "/images/scholarship/2024/Ethan_Gray.jpg",
      },
      {
        name: "Hannah Hoang",
        img: "/images/scholarship/2024/Hannah_Hoang.jpg",
      },
      {
        name: "Madeline Kriha",
        img: "/images/scholarship/2024/Madeline_Kriha.jpg",
      },
    ],
  },
  {
    year: 2023,
    recipients: [
      {
        name: "Eric Umble",
      },
      {
        name: "Megan Lin",
      },
      {
        name: "Bill Wang",
      },
      {
        name: "Quinn Colognato",
      },
    ],
  },
  {
    year: 2022,
    recipients: [
      {
        name: "Tashi Jha",
        img: "/images/scholarship/2022/tashi_jha.jpg",
      },
      {
        name: "Rebecca Shaw",
        img: "/images/scholarship/2022/rebecca_shaw.jpg",
      },
      {
        name: "Hannah Nardini",
        img: "/images/scholarship/2022/hannah_nardini.png",
      },
      {
        name: "Rebecca Saper",
        img: "/images/scholarship/2022/rebecca_saper.gif",
      },
    ],
  },
  {
    year: 2021,
    recipients: [
      {
        name: "Sara Seelman",
        img: "/images/scholarship/2021/sara_seelman.jpg",
      },
      {
        name: "Rafael Cenzano",
        img: "/images/scholarship/2021/rafael_cenzano.jpg",
      },
    ],
  },
];
