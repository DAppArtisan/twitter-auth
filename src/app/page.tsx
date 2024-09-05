"use client";

export default function Home() {
  function handleTwitterLogin() {
    const clientId = process.env.NEXT_PUBLIC_TWITTER_ID as string;
    const redirectUri = encodeURIComponent(
      "https://twitter-auth-nine.vercel.app/api/auth/callback"
    );
    const state = "twitter_oauth_state"; // Replace with a random string in production
    const codeChallenge = "codeChallenge"; // This should be dynamically generated with PKCE in production

    // Construct the authorization URL
    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=tweet.read%20users.read&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    // Redirect the user to the Twitter authorization URL
    window.location.href = authUrl;
  }

  return (
    <div>
      <button onClick={handleTwitterLogin}>Twitter Login</button>
    </div>
  );
}
