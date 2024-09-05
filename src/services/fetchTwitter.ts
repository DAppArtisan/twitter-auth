import axios from "axios";

export default async function fetchTwitterUserInfo(code: string) {
  try {
    if (!code) {
      throw new Error("Authorization code is missing");
    }

    // const clientId = process.env.NEXT_PUBLIC_TWITTER_ID as string;
    // const clientSecret = process.env.NEXT_PUBLIC_TWITTER_SECRET as string;
    // const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URL;
    // const codeVerifier = "random_code_challenge";
    const clientId = "TjR3emVKX3ZtTFNNdUd5cEVKWFc6MTpjaQ";
    // const clientSecret = "KxKOV0oXZZn4FWYzHrGnYjOYOdL4DiSOCW5go1KGckijzO";
    const redirectUri = "https://twitter-auth.vercel.com";
    const codeVerifier = "random_code_challenge";

    // if (!clientId || !clientSecret || !redirectUri) {
    //   throw new Error("Twitter client ID, secret, or redirect URI is missing");
    // }

    // Twitter OAuth 2.0 token endpoint
    const tokenUrl = "https://api.x.com/2/oauth2/token";

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

    // Use the access token to fetch user information
    const userUrl = "https://api.x.com/2/users/me"; // Adjust the endpoint as needed

    const userResponse = await axios.get(userUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userResponse.data;
    console.log("User Info:", user);

    return user;
  } catch (error) {
    console.error("Error during Twitter OAuth callback:", error);
    throw error;
  }
}
