"use client";

import { useRouter as useCompatRouter } from "next/compat/router";
import { useMemo } from "react";

interface CompatibleRouter {
  asPath: string;
  push: (href: string) => void;
}

const getBrowserPath = () => {
  if (typeof window === "undefined") {
    return "/";
  }

  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
};

export function useAppCompatibleRouter(): CompatibleRouter {
  const router = useCompatRouter();

  return useMemo(
    () => ({
      asPath: router?.asPath ?? getBrowserPath(),
      push: (href: string) => {
        if (router) {
          void router.push(href);
          return;
        }

        if (typeof window !== "undefined") {
          window.location.assign(href);
        }
      },
    }),
    [router]
  );
}
