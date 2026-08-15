"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Error from "@/components/error";
import { useAlert } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";

let logoutRequest: Promise<{ success?: boolean }> | null = null;

function postLogout(): Promise<{ success?: boolean }> {
  if (!logoutRequest) {
    logoutRequest = fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json() as Promise<{ success?: boolean }>)
      .finally(() => {
        logoutRequest = null;
      });
  }

  return logoutRequest;
}

interface LogoutClientProps {
  redirectPath: string;
}

export function LogoutClient({ redirectPath }: LogoutClientProps) {
  const router = useRouter();
  const { logout } = useAuth();
  const [error, setError] = useState(false);
  const { newAlert } = useAlert();

  useEffect(() => {
    let cancelled = false;

    postLogout()
      .then((data) => {
        if (cancelled) {
          return;
        }
        if (data.success) {
          logout();
          router.replace(redirectPath);
        } else {
          newAlert("Failed to logout", "danger");
          setError(true);
        }
      })
      .catch((fetchError) => {
        if (cancelled) {
          return;
        }
        console.error("Error logging out:", fetchError);
        newAlert("Failed to logout", "danger");
        setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [router, logout, newAlert, redirectPath]);

  return (
    <>
      {!error && <p>Logging out...</p>}
      {error && <Error title="Error logging out" />}
    </>
  );
}
