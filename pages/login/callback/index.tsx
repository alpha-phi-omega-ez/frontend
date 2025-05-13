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

  function sanitizeRedirectPath(path: string | null) {
    // Allow only paths starting with "/" and disallow any external URLs, path traversal, or embedded protocols
    if (
      path &&
      path.startsWith("/") &&
      !path.startsWith("//") &&
      !path.includes("..") &&
      !path.includes(":")
    ) {
      return path;
    }
    return null; // Default to null if the path is invalid
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const redirectPath = sanitizeRedirectPath(urlParams.get("redirect")) || "/";

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
