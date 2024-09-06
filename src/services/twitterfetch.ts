import axios from "axios";

export default async function fetchTwitter(code: string) {
  try {
    console.log("fetch code works");

    if (!code) {
      throw new Error("Authorization code is missing");
    }

    const clientId = process.env.NEXT_PUBLIC_TWITTER_ID;
    const clientSecret = process.env.NEXT_PUBLIC_TWITTER_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Twitter client credentials are missing.");
    }

    const redirectUri = "https://twitter-auth-nine.vercel.app/api/callback";
    const codeVerifier = "random_code_challenge"; // This should be dynamically generated and stored in a session or local storage

    const base64EncodedCredentials = Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString("base64");

    const tokenResponse = await axios.post(
      "https://api.twitter.com/2/oauth2/token",
      new URLSearchParams({
        code: code,
        grant_type: "authorization_code",
        client_id: clientId, // Ensure that clientId is not undefined
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${base64EncodedCredentials}`,
        },
      }
    );

    const { access_token } = tokenResponse.data;

    const userResponse = await axios.get("https://api.twitter.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userResponse.data;
    return user;
  } catch (error) {
    console.error("Error during Twitter OAuth callback:", error);
    throw error;
  }
}
