"use client";

import type { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { AlertProvider } from "@/context/AlertContext";
import { AuthProvider } from "@/context/AuthContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <AlertProvider>{children}</AlertProvider>
        </AuthProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
