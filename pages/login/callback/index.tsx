import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Error from "@/components/error";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";

export default function CallBackPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState(false);
  const { newAlert } = useAlert();

  useEffect(() => {
    function getSafeRedirectPath(path: string | null): string {
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

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const redirectPath = getSafeRedirectPath(urlParams.get("redirect"));

    if (code) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code }),
      })
        .then(() => {
          login();
          router.push(redirectPath);
          return null;
        })
        .catch((error) => {
          console.error("Error fetching token:", error);
          newAlert("Failed to login", "danger");
          setError(true);
        });
    } else {
      setError(true);
    }
  }, [router]);

  return (
    <>
      {!error && <p>Logging in...</p>}
      {error && <Error title="Error logging in" />}
    </>
  );
}
