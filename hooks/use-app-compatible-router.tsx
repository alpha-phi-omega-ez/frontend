"use client";

import {
  createContext,
  useContext,
  useMemo,
  Suspense,
  type ReactNode,
} from "react";
import {
  useRouter as useAppRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { useRouter as usePagesRouter } from "next/router";
import { useRouter as useCompatRouter } from "next/compat/router";

export interface CompatibleRouter {
  asPath: string;
  push: (href: string) => void;
}

export const CompatibleRouterContext =
  createContext<CompatibleRouter | null>(null);

const getBrowserPath = () => {
  if (typeof window === "undefined") {
    return "/";
  }

  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
};

function AppRouterNavigationInner({ children }: { children: ReactNode }) {
  const router = useAppRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const asPath = useMemo(() => {
    const q = searchParams?.toString() ?? "";
    const base = pathname ?? "/";
    return `${base}${q ? `?${q}` : ""}`;
  }, [pathname, searchParams]);

  const value = useMemo<CompatibleRouter>(
    () => ({
      asPath,
      push: (href: string) => {
        void router.push(href);
      },
    }),
    [router, asPath],
  );

  return (
    <CompatibleRouterContext.Provider value={value}>
      {children}
    </CompatibleRouterContext.Provider>
  );
}

/** usePathname-only fallback while search params stream (avoids empty Suspense). */
function AppRouterNavigationFallback({ children }: { children: ReactNode }) {
  const router = useAppRouter();
  const pathname = usePathname();
  const value = useMemo<CompatibleRouter>(
    () => ({
      asPath: pathname ?? "/",
      push: (href: string) => {
        void router.push(href);
      },
    }),
    [router, pathname],
  );

  return (
    <CompatibleRouterContext.Provider value={value}>
      {children}
    </CompatibleRouterContext.Provider>
  );
}

/**
 * App Router only (`app/layout` → `Providers`). Uses `next/navigation`; do not
 * mount under `pages/_app` — use {@link PagesCompatibleRouterProvider} there.
 */
export function AppCompatibleRouterProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <AppRouterNavigationFallback>{children}</AppRouterNavigationFallback>
      }
    >
      <AppRouterNavigationInner>{children}</AppRouterNavigationInner>
    </Suspense>
  );
}

/**
 * Pages Router only (`pages/_app`). Fills the same context as
 * {@link AppCompatibleRouterProvider} using `next/router` so shared components
 * get `asPath` / client `push` without relying on compat or `window` fallbacks.
 */
export function PagesCompatibleRouterProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = usePagesRouter();
  const value = useMemo<CompatibleRouter>(
    () => ({
      asPath: router.asPath,
      push: (href: string) => {
        void router.push(href);
      },
    }),
    [router],
  );

  return (
    <CompatibleRouterContext.Provider value={value}>
      {children}
    </CompatibleRouterContext.Provider>
  );
}

export function useAppCompatibleRouter(): CompatibleRouter {
  const fromApp = useContext(CompatibleRouterContext);
  const compat = useCompatRouter();

  if (fromApp) {
    return fromApp;
  }

  if (compat) {
    return {
      asPath: compat.asPath,
      push: (href: string) => {
        void compat.push(href);
      },
    };
  }

  return {
    asPath: getBrowserPath(),
    push: (href: string) => {
      if (typeof window !== "undefined") {
        window.location.assign(href);
      }
    },
  };
}
