import { redirect } from "next/navigation";

import { checkAuthServer, getRequestOrigin } from "@/utils/auth-server";
import { getSafeRedirectPath } from "@/utils/redirect";

// Auth action route: always redirects — not meant to be instant.
export const instant = false;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  const origin = await getRequestOrigin();
  const redirectPath = getSafeRedirectPath(params.redirect ?? null, origin);
  const isAuthenticated = await checkAuthServer();

  if (isAuthenticated) {
    redirect("/");
  }

  const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

  if (!backendServer) {
    redirect("/");
  }

  redirect(`${backendServer}/login?redirect=${encodeURIComponent(redirectPath)}`);
}
