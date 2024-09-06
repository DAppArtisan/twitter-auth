"use client";

export default function Home() {
  function handleTwitterLogin() {
    const clientId = "TjR3emVKX3ZtTFNNdUd5cEVKWFc6MTpjaQ";
    const redirectUri = encodeURIComponent(
      "https://twitter-auth-nine.vercel.app/api/twitter"
    );
    const state = "state"; // You should use a random string in production

    const codeChallenge = "codeChallenge";

    // Construct the authorization URL
    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=tweet.read%20users.read%20follows.read%20offline.access&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    // Redirect the user to the authorization URL
    window.location.href = authUrl;
  }

  return (
    <div>
      <button onClick={handleTwitterLogin}>Twitter Login</button>
    </div>
  );
}
