export const Semester = "Fall 2026";

interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

export const Events: Event[] = [
  {
    title: "Card Making",
    description: "Make cards for hospitalized children",
    date: "Monday, August 31st, 2026",
    time: "6 pm to 7 pm",
    location: "Union Shelnutt Gallery",
  },
  {
    title: "Presentation Night",
    description:
      "Learn how to present in a professional setting!",
    date: "Thursday, September 3rd, 2026",
    time: "6 pm to 7 pm",
    location: "Union Phalanx Room",
  },
  {
    title: "Bob Ross Night",
    description: "Paint along with Bob Ross and meet APO brothers",
    date: "Friday, September 4th, 2026",
    time: "6 pm to 9 pm",
    location: "Union Shelnutt Gallery",
  },
  {
    title: "Board Games, Apple Cider, and Cookies",
    description: "Join us for a night of fun and relaxation!",
    date: "Tuesday, September 8th, 2026",
    time: "7 pm to 9 pm",
    location: "Low 4040",
  },
  {
    title: "Dog Toy Crafting",
    description:
      "Make dog toys out of old shirts",
    date: "Thursday, September 10th, 2026",
    time: "5 pm to 7 pm",
    location: "Union Shelnutt Gallery",
  },
  {
    title: "Welcome Dinner",
    description:
      "Join the Members of Alpha Phi Omega, a national service fraternity in welcoming the potential new members with a delicious meal!",
    date: "Friday, September 11th, 2026",
    time: "6 pm to 9 pm",
    location: "Union Shelnutt Gallery",
  },
];
