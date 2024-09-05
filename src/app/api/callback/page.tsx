"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function TwitterCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      // Send the authorization code to your backend to exchange it for an access token
      fetch("/api/auth/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Access Token:", data.accessToken);
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    }
  }, [code]);

  return (
    <div>
      <h1>Twitter OAuth 2.0</h1>
      <p>Waiting for authorization...</p>
    </div>
  );
}
