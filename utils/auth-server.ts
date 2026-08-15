import { cookies, headers } from "next/headers";

function firstHeaderValue(value: string | null): string | null {
  if (!value) {
    return null;
  }

  return value.split(",")[0]?.trim() || null;
}

export async function getRequestOrigin(): Promise<string> {
  const configured = process.env.SITE_URL?.trim().replace(/\/$/, "");
  if (configured) {
    return configured;
  }

  const headersList = await headers();
  const host =
    firstHeaderValue(headersList.get("host")) ??
    firstHeaderValue(headersList.get("x-forwarded-host"));

  if (!host) {
    return "https://apoez.org";
  }

  const protocol =
    firstHeaderValue(headersList.get("x-forwarded-proto")) ?? "https";
  return `${protocol}://${host}`;
}

export async function checkAuthServer(): Promise<boolean> {
  const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

  if (!backendServer) {
    return false;
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  if (!cookieHeader) {
    return false;
  }

  try {
    const response = await fetch(`${backendServer}/auth/check`, {
      method: "GET",
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    if (response.ok) {
      const data = (await response.json()) as { authenticated?: boolean };
      return Boolean(data.authenticated);
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
  }

  return false;
}
