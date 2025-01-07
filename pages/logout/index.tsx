import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Error from "@/components/error";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";

export default function LogoutPage() {
  const router = useRouter();
  const { auth, logout } = useAuth();
  const [error, setError] = useState(false);
  const { newAlert } = useAlert();

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
            Promise.resolve(logout()).then(() => {
              console.log("Logged out successfully");
              router.push("/");
              return null;
            });
          } else {
            newAlert("Failed to logout", "danger");
            setError(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching token:", error);
          newAlert("Failed to logout", "danger");
          setError(true);
        });
    } else {
      Promise.resolve(logout()).then(() => {
        router.push("/");
      });
    }
  }, [router]);

  return (
    <>
      {!error && <p>Logging out...</p>}
      {error && <Error title="Error logging out" />}
    </>
  );
}
