import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    console.log("code", code);
    if (!code) {
      return NextResponse.json(
        { error: "Authorization code is missing" },
        { status: 400 }
      );
    }

    const clientId = process.env.NEXT_PUBLIC_TWITTER_ID as string;
    const clientSecret = process.env.NEXT_PUBLIC_TWITTER_SECRET as string;
    const redirectUri = "https://twitter-auth-nine.vercel.app/api/callback"; // Updated redirect URI
    const codeVerifier = "random_code_challenge"; // This should be dynamically generated

    // Exchange authorization code for an access token
    const tokenResponse = await axios.post(
      "https://api.x.com/2/oauth2/token",
      new URLSearchParams({
        code,
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // Fetch user information using the access token
    const userResponse = await axios.get("https://api.x.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userResponse.data;

    return NextResponse.json({ accessToken: access_token, user });
  } catch (error) {
    console.error("Error during Twitter OAuth callback:", error);
    return NextResponse.json(
      { error: "Failed to exchange token" },
      { status: 500 }
    );
  }
}
