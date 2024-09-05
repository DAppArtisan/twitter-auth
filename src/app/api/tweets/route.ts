import { NextRequest, NextResponse } from "next/server";
import { Client, auth } from "twitter-api-sdk";

const URL = process.env.NEXT_PUBLIC_X_REDIRECT_URL || "http://localhost:3000";

const authClient = new auth.OAuth2User({
  client_id: process.env.NEXT_PUBLIC_TWITTER_ID as string,
  client_secret: process.env.NEXT_PUBLIC_TWITTER_SECRET as string,
  callback: `${URL}/api/callback`,
  scopes: ["tweet.read", "users.read"],
});

const client = new Client(authClient);

export async function GET() {
  try {
    const response = await client.users.findMyUser({
      "user.fields": [
        "id",
        "name",
        "username",
        "profile_image_url",
        "created_at",
        "verified",
      ],
    });
    console.log("response", response);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
