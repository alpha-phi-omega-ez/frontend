interface Award {
  name: string;
  years: string;
  from: string;
  purpose: string;
}

interface AwardImage {
  img: string;
  alt: string;
}

export const awards: Award[] = [
  {
    name: "Joseph J. Scanlon National Certificate of Merit",
    years: "2024",
    from: "APO National Office",
    purpose: "Recognition for significant membership growth.",
  },
  {
    name: "Diamond Level Chapter of Excellence",
    years: "2024",
    from: "APO National Office",
    purpose: "Recognition for a chapter with string LFS programs.",
  },
  {
    name: "Dean Arno Nowotny",
    years: "2023",
    from: "APO National Office",
    purpose:
      "Conducting the most significant service program in the fraternity during 2022-2023.",
  },
  {
    name: "Josiah Frank Historian's Award",
    years: "2023",
    from: "APO National Office",
    purpose:
      "Recognize EZ For excellence in compiling and maintaining chapter history, 2022-2023.",
  },
  {
    name: "Dean Arno Nowotny",
    years: "2010",
    from: "APO National Office",
    purpose:
      "Conducting the most significant service program in the fraternity during 2022-2023.",
  },
  {
    name: "Rensselaer Union Volunteer Recognition Award",
    years: "2004",
    from: "Rensselaer Union",
    purpose:
      "Outstanding service to the local and/or national community by a club or organization at Rensselaer Polytechnic Institute.",
  },
  {
    name: "Josiah Frank Historian's Award",
    years: "2004",
    from: "APO National Office",
    purpose:
      "Recognize EZ For excellence in compiling and maintaining chapter history, 2002-2004.\nSpecial thanks to Doctor Alyssa Pasquale for all their work done in compiling records!",
  },
  {
    name: "Dean Arno Nowotny",
    years: "2004",
    from: "APO National Office",
    purpose:
      "Conducting the most significant service program in the fraternity during 2002-2004.",
  },
  {
    name: "H. Roe Bartle Chapter Award",
    years: "1999",
    from: "APO National Office",
    purpose: "Outstanding achievement in chapter administration and program.",
  },
  {
    name: "Dean Arno Nowotny",
    years: "1998",
    from: "APO National Office",
    purpose:
      "Conducting the most significant service program in the fraternity during 1996-1998.",
  },
  {
    name: "City of Troy Proclamation",
    years: "1997",
    from: "City of Troy, Mayor's Office",
    purpose:
      "Recognize EZ for community impact and to congratulate the chapter on their 50th year. Declaration of May 11, 1997 as Alpha Phi Omega Day in the City of Troy.",
  },
  {
    name: "Service Award",
    years: "1997",
    from: "APO Region II",
    purpose:
      "Recognize EZ for For outstanding service in the community during 1997.",
  },
  {
    name: "City of Troy Proclamation",
    years: "1987",
    from: "City of Troy, Mayor's Office",
    purpose:
      "Recognize EZ for community impact and to congratulate the chapter on their 40th year. Declaration of March 28, 1987 as Alpha Phi Omega Day in the City of Troy.",
  },
  {
    name: "H. Roe Bartle Chapter Award",
    years: "1986",
    from: "APO National Office",
    purpose: "Outstanding achievement in chapter administration and program.",
  },
  {
    name: "City of Troy Proclamation",
    years: "1985",
    from: "City of Troy, Mayor's Office",
    purpose:
      "Recognize EZ for community impact and winning their second nowotny and the M R Disborough Scouting Service Award in 1984. Declaration of March 5, 1985 as Epsilon Zeta Day in the City of Troy.",
  },
  {
    name: "M R Disborough",
    years: "1984",
    from: "APO National Office",
    purpose:
      "Exceptional service to Scouting as an integral part of the overall service program.",
  },
  {
    name: "Dean Arno Nowotny",
    years: "1984",
    from: "APO National Office",
    purpose:
      "Conducting the most significant service program in the fraternity during 1982-1984.",
  },
  {
    name: "H. Roe Bartle Chapter Award",
    years: "1983, 1984",
    from: "APO National Office",
    purpose: "Outstanding achievement in chapter administration and program.",
  },
  {
    name: "RPI Community Service Award and Proclamation",
    years: "1982",
    from: "RPI Board of Trustees",
    purpose: "Award EZ's continued community engagement and community service.",
  },
  {
    name: "City of Troy Proclamation",
    years: "1981",
    from: "City of Troy, Mayor's Office",
    purpose:
      "Recognize EZ for continued community impact and winning their first nowotny. Declaration of March 30, 1981 as Alpha Phi Omega Day in the City of Troy.",
  },
  {
    name: "H. Roe Bartle Chapter Award",
    years: "1981",
    from: "APO National Office",
    purpose: "Outstanding achievement in chapter administration and program.",
  },
  {
    name: "Arno Nowotny National Service Award",
    years: "1980",
    from: "APO National Office",
    purpose:
      "Conducting the most significant service program in the fraternity during 1978-1980.",
  },
  {
    name: "H. Roe Bartle Chapter Award",
    years: "1976, 1977, 1978, 1979, 1980",
    from: "APO National Office",
    purpose: "Outstanding achievement in chapter administration and program.",
  },
];

export const award_images: AwardImage[] = [
  { img: "/images/APO_Awards.jpg", alt: "2023 Awards" },
  { img: "/images/2004_awards.jpg", alt: "2004 Awards" },
];
