"use client";

export default function Home() {
  function handleXLogin() {
    // const clientId = process.env.NEXT_PUBLIC_TWITTER_ID as string;
    // const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URL as string;
    // const state = "twitter_oauth_state";
    // const codeChallenge = "random_code_challenge";

    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=TjR3emVKX3ZtTFNNdUd5cEVKWFc6MTpjaQ&redirect_uri=twitter-auth-nine.vercel.app&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;

    window.location.href = authUrl;
  }

  return (
    <div>
      <button onClick={handleXLogin}>Twitter newLogin</button>
    </div>
  );
}
