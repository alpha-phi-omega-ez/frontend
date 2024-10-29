import { useEffect } from "react";
import { useRouter } from "next/router";

const CallBackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          const token = data.access_token;
          if (token) {
            localStorage.setItem("access_token", token); // Store the token or handle it as needed
            router.push("/");
            return null;
          }
        })
        .catch((error) => console.error("Error fetching token:", error));
    }
    router.push("/login/error");
  }, [router]);

  return null;
};

export default CallBackPage;
