export function getSafeRedirectPath(path: string | null): string {
  if (!path) {
    return "/";
  }

  try {
    // Use the browser's URL parser to handle the path.
    // We provide the current window's origin as the base.
    const targetUrl = new URL(path, window.location.origin);

    // Ensure the constructed URL's origin is the same as the app's origin.
    if (targetUrl.origin === window.location.origin) {
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
