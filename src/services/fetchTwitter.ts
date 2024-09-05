import axios from "axios";
import { auth } from "twitter-api-sdk";

export default async function fetchTwitter(code: string) {
  try {
    console.log("fetch code works");

    if (!code) {
      throw new Error("Authorization code is missing");
    }

    // Replace the hardcoded clientId, clientSecret, and redirectUri with your own
    const clientId = "TjR3emVKX3ZtTFNNdUd5cEVKWFc6MTpjaQ";
    const clientSecret = "KxKOV0oXZZn4FWYzHrGnYjOYOdL4DiSOCW5go1KGckijzO";
    const redirectUri =
      "https://twitter-auth-nine.vercel.app/api/auth/callback";
    const codeVerifier = "random_code_challenge";

    const authClient = new auth.OAuth2User({
      client_id: clientId,
      client_secret: clientSecret,
      callback: redirectUri,
      scopes: ["users.read"],
    });

    // Exchange the authorization code for an access token
    const tokenResponse = await authClient.requestAccessToken(code);

    // Handle the access token response
    const accessToken = tokenResponse.token.access_token; // Adjust based on the response structure
    console.log("Access Token:", accessToken);

    // Fetch user data from Twitter using the access token
    const userResponse = await axios.get("https://api.twitter.com/2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = userResponse.data;
    return user;
  } catch (error) {
    console.error("Error during Twitter OAuth callback:", error);
    throw error;
  }
}
