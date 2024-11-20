import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "@/layouts/default";
import Error from "../../_error";
import { useAuth } from "@/context/AuthContext";

export default function CallBackPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const redirectPath = urlParams.get("redirect") || "/";

    if (code) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code }),
      })
        .then((_) => {
          login();
          router.push(redirectPath);
          return null;
        })
        .catch((error) => {
          console.error("Error fetching token:", error);
          setError(true);
        });
    } else {
      setError(true);
    }
  }, [router]);

  return (
    <DefaultLayout>
      {!error && <p>Logging in...</p>}
      {error && <Error title="Error logging in" />}
    </DefaultLayout>
  );
}
