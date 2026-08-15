"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ErrorView from "@/components/error";
import { useAlert } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";
import { getSafeRedirectPath } from "@/utils/redirect";

const tokenExchanges = new Map<string, Promise<void>>();

function exchangeToken(code: string): Promise<void> {
  const existing = tokenExchanges.get(code);
  if (existing) {
    return existing;
  }

  const request = fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ code }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to login");
      }
    })
    .finally(() => {
      tokenExchanges.delete(code);
    });

  tokenExchanges.set(code, request);
  return request;
}

function CallbackPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState(false);
  const { newAlert } = useAlert();
  const code = searchParams?.get("code") ?? null;
  const redirectParam = searchParams?.get("redirect") ?? null;

  useEffect(() => {
    const redirectPath = getSafeRedirectPath(
      redirectParam,
      window.location.origin,
    );

    if (!code) {
      setError(true);
      return;
    }

    let cancelled = false;

    exchangeToken(code)
      .then(() => {
        if (cancelled) {
          return;
        }
        login();
        router.replace(redirectPath);
      })
      .catch((fetchError) => {
        if (cancelled) {
          return;
        }
        console.error("Error fetching token:", fetchError);
        newAlert("Failed to login", "danger");
        setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [router, code, redirectParam, login, newAlert]);

  return (
    <>
      {!error && <p>Logging in...</p>}
      {error && <ErrorView title="Error logging in" />}
    </>
  );
}

export default function CallbackPage() {
  return (
    <Suspense>
      <CallbackPageInner />
    </Suspense>
  );
}
