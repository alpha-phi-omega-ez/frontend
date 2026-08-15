import { Suspense } from "react";
import { redirect } from "next/navigation";

import { checkAuthServer, getRequestOrigin } from "@/utils/auth-server";
import { getSafeRedirectPath } from "@/utils/redirect";

import { LogoutClient } from "./logout-client";

// Auth action route: always redirects or runs logout — not meant to be instant.
export const instant = false;

export default async function LogoutPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  const origin = await getRequestOrigin();
  const redirectPath = getSafeRedirectPath(params.redirect ?? null, origin);
  const isAuthenticated = await checkAuthServer();

  if (!isAuthenticated) {
    redirect(redirectPath);
  }

  return (
    <Suspense>
      <LogoutClient redirectPath={redirectPath} />
    </Suspense>
  );
}
