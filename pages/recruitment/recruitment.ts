export const Semester = "Spring 2025";

interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

export const Events: Event[] = [
  {
    title: "Presentation Blunders 101",
    description: "Learn how to present in a professional setting!",
    date: "Monday, January 13th, 2025",
    time: "5 pm to 6:30 pm",
    location: "Union Shellnut Gallery",
  },
  {
    title: "Team Trivia",
    description:
      "Test your knowledge and help raise funds for food for the UN World Food Program through Free Rice",
    date: "Wednesday January 15th, 2025",
    time: "4 pm to 5:30 pm",
    location: "Union Shellnut Gallery",
  },
  {
    title: "USS Slater",
    description: "Learn about and clean the USS Slater in Albany",
    date: "Saturday, January 18th, 2025",
    time: "TBA",
    location: "USS Slater, Meet at the APO Office Union 3420",
  },
  {
    title: "Game Night, Hot Cocoa, and Cookie Decorating",
    description: "Join us for a night of fun and relaxation!",
    date: "Tuesday, January 21st, 2025",
    time: "4 pm to 6:30 pm",
    location: "Union Shellnut Gallery",
  },
  {
    title: "Card Making",
    description:
      "Make cards for soldiers overseas to send back to their families",
    date: "Thursday, January 23rd, 2025",
    time: "5:30 pm to 7 pm",
    location: "Union Shellnut Gallery",
  },
  {
    title: "Bob Ross Night",
    description: "Paint along with Bob Ross and meet APO brothers",
    date: "Friday, January 24th, 2025",
    time: "6 pm to 9 pm",
    location: "Union McNeil Room",
  },
  {
    title: "Resume Review",
    description:
      "Get your resume reviewed by APO brothers with internship/REU experience",
    date: "Monday, January 27th, 2025",
    time: "6:30 pm to 7:30 pm",
    location: "Union Shellnut Gallery",
  },
  {
    title: "Welcome Dinner",
    description:
      "Join the Members of Alpha Phi Omega, a national service fraternity in welcoming the potential new members with a delicious meal!",
    date: "Friday, January 31st, 2025",
    time: "6 pm to 9 pm",
    location: "Union Shellnut Gallery",
  },
];
