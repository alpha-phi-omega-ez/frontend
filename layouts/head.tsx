import React from "react";
import NextHead from "next/head";
import { siteConfig } from "@/config/site";

export const Head = () => {
  return (
    <NextHead>
      <title>{siteConfig.name}</title>
      <meta key="title" content={siteConfig.name} property="og:title" />
      <meta content={siteConfig.description} property="og:description" />
      <meta content={siteConfig.description} name="description" />
      <meta name="keywords" content={siteConfig.keywords} />
      <meta name="robots" content="index, follow" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <link href="/favicon.ico" rel="icon" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <meta property="og:title" content={siteConfig.name} />
      <meta property="og:site_name" content={siteConfig.description} />
      <meta property="og:description" content={siteConfig.description} />
      <meta property="og:url" content="https://apoez.org/" />
      <meta property="og:image" content="/logo.png" />
      <meta name="twitter:title" content={siteConfig.name} />
      <meta name="twitter:card" content={siteConfig.description} />
      <meta name="twitter:description" content={siteConfig.description} />
      <meta name="twitter:url" content="https://apoez.org/" />
      <meta name="twitter:image" content="/logo.png" />
      <meta itemProp="name" content={siteConfig.name} />
      <meta itemProp="description" content={siteConfig.description} />
      <meta itemProp="image" content="/logo.png" />
      <link rel="author" href="https://rafaelcenzano.com" />
    </NextHead>
  );
};
