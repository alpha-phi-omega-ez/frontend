module.exports = {
  siteUrl: "https://apoez.org",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin/*", "/wiki/*", "login/*", "logout/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        disallow: "/admin",
        disallow: "/wiki",
      },
    ],
  },
};
