"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/tweets");
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/login"; // Redirect to Twitter login
  };

  function handleXLogin() {
    const clientId = process.env.NEXT_PUBLIC_TWITTER_ID as string;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URL as string;
    const state = "twitter_oauth_state";
    const codeChallenge = "random_code_challenge";

    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=tweet.read%20users.read&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=plain`;

    window.location.href = authUrl;
  }

  return (
    <div>
      <h1>Twitter Authentication with Next.js (App Router)</h1>
      {error && <p>Error: {error}</p>}
      {userData ? (
        <div>
          <h2>
            Welcome, {userData.data.name} (@{userData.data.username})
          </h2>
          <img src={userData.data.profile_image_url} alt='Profile' />
          <p>
            Joined Twitter:{" "}
            {new Date(userData.data.created_at).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <>
          <button onClick={handleLogin}>Login with Twitter</button>
          <button onClick={handleXLogin}>Twitter newLogin</button>
        </>
      )}
    </div>
  );
}
