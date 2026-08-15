export function getSafeRedirectPath(
  path: string | null,
  origin?: string,
): string {
  if (!path) {
    return "/";
  }

  const baseOrigin =
    origin ??
    (typeof window !== "undefined" ? window.location.origin : undefined);

  if (!baseOrigin) {
    return "/";
  }

  try {
    // Use the URL parser to handle the path, with a known origin as the base.
    const targetUrl = new URL(path, baseOrigin);

    // Ensure the constructed URL's origin is the same as the app's origin.
    if (targetUrl.origin === new URL(baseOrigin).origin) {
      // Return the relative path and any search params.
      return targetUrl.pathname + targetUrl.search;
    }
  } catch {
    // The URL constructor will throw an error for invalid inputs like 'javascript:alert(1)'.
    // We catch it and fall back to the default path.
    return "/";
  }

  // If origins do not match, fall back to the default path.
  return "/";
}
