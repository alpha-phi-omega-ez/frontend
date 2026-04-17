"use client";

import type { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { AlertProvider } from "@/context/AlertContext";
import { AuthProvider } from "@/context/AuthContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const navigate = (href: string) => {
    if (typeof window !== "undefined") {
      window.location.assign(href);
    }
  };

  return (
    <HeroUIProvider navigate={navigate}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <AlertProvider>{children}</AlertProvider>
        </AuthProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
