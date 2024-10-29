import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/login`);
  }, [router]);

  return null;
}
