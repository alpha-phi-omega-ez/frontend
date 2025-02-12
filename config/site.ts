export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Alpha Phi Omega - Epsilon Zeta Chapter",
  description:
    "Website for the Alpha Phi Omega, Epsilon Zeta Chapter at Rensselaer Polytechnic Institute.",
  keywords:
    "APOEZ APO Alpha Phi Omega Epsilon Zeta RPI Rensselaer Polytechnic Institute Lost and Found Backtests Loaner Tech Community Service Fellowship Leadership Friendship Professional Development Student Organization",
  navItems: [
    {
      item: "About Us",
      sublinks: [
        {
          label: "History",
          href: "/about/history",
        },
        {
          label: "Officers",
          href: "/about/officers",
        },
        {
          label: "Policies",
          href: "/about/policies",
        },
      ],
    },
    {
      item: "Awards",
      sublinks: [
        {
          label: "Chapter Awards",
          href: "/awards/chapter",
        },
        {
          label: "Individual Awards",
          href: "/awards/individual",
        },
      ],
    },
    {
      item: "Service",
      sublinks: [
        {
          label: "Large Service Events",
          href: "/service/events",
        },
        {
          label: "Service Program",
          href: "/service/program",
        },
        {
          label: "Freshman Service Scholarship",
          href: "/service/scholarship",
        },
      ],
    },
    {
      item: "Fellowship",
      sublinks: [
        {
          label: "Fellowship Overview",
          href: "/fellowship",
        },
      ],
    },
    {
      item: "Office",
      sublinks: [
        {
          label: "Lost & Found",
          href: "/laf",
        },
        {
          label: "Backtests",
          href: "/backtests",
        },
        {
          label: "Loaner Tech",
          href: "/loanertech",
        },
      ],
    },
    {
      item: "Recruitment",
      sublinks: [
        {
          label: "Joining",
          href: "/joining",
        },
        {
          label: "Events",
          href: "/recruitment",
        },
      ],
    },
  ],
  adminNavItems: [
    {
      label: "Wiki",
      href: "https://wiki.apoez.org/",
    },
    {
      label: "Money Tool",
      href: "https://sites.google.com/apoez.org/apoezmoneytool/home",
    },
  ],
};
