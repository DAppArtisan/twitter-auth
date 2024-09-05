import { NextRequest, NextResponse } from "next/server";
import { auth } from "twitter-api-sdk";

const URL = process.env.NEXT_PUBLIC_X_REDIRECT_URL || "http://localhost:3000";
const STATE = "twitter_oauth_state";

const authClient = new auth.OAuth2User({
  client_id: process.env.NEXT_PUBLIC_TWITTER_ID as string,
  client_secret: process.env.NEXT_PUBLIC_TWITTER_SECRET as string,
  callback: `${URL}/api/callback`,
  scopes: ["users.read"],
});

export async function GET() {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });
  return NextResponse.redirect(authUrl);
}
