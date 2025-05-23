import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get("redirect") || "/";

    if (!auth.isAuthenticated) {
      router.push(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/login?redirect=${redirectPath}`
      );
    } else {
      router.push("/");
    }
  }, [router]);

  return null;
}
