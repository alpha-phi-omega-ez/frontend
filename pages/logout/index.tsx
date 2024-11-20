import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "@/layouts/default";
import Error from "../_error";
import { useAuth } from "@/context/AuthContext";

export default function LogoutPage() {
  const router = useRouter();
  const { auth, logout } = useAuth();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Logged out successfully");
            logout();
            router.push("/");
            return null;
          }
        })
        .catch((error) => {
          console.error("Error fetching token:", error);
          setError(true);
        });
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <DefaultLayout>
      {!error && <p>Logging out...</p>}
      {error && <Error title="Error logging out" />}
    </DefaultLayout>
  );
}
