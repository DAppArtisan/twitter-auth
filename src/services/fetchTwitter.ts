import axios from "axios";
export default async function fetchTwitter(code: string) {
  try {
    console.log("fetch code works");

    if (!code) {
      throw new Error("Authorization code is missing");
    }

    const clientId = "TjR3emVKX3ZtTFNNdUd5cEVKWFc6MTpjaQ";
    // const clientSecret = "KxKOV0oXZZn4FWYzHrGnYjOYOdL4DiSOCW5go1KGckijzO";
    const redirectUri = "https://twitter-auth-nine.vercel.app/api/twitter";
    const codeVerifier = "random_code_challenge";

    // Twitter OAuth 2.0 token endpoint
    const tokenUrl = "https://api.twitter.com/2/oauth2/token";

    // Prepare the request body
    const requestBody = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    }).toString();

    // Exchange code for access token
    const tokenResponse = await axios.post(tokenUrl, requestBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token } = tokenResponse.data;
    console.log("Access Token:", access_token);

    // Fetch user data from Twitter using the access token
    const userResponse = await axios.get("https://api.x.com/2/users/me", {
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
