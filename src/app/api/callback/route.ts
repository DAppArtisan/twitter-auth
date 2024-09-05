// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "twitter-api-sdk";
// import { headers } from "next/headers";
// const URL: string =
//   process.env.NEXT_PUBLIC_X_REDIRECT_URL || "http://localhost:3002";
// const STATE = "twitter_oauth_state";

// const authClient = new auth.OAuth2User({
//   client_id: process.env.NEXT_PUBLIC_TWITTER_ID as string,
//   client_secret: process.env.NEXT_PUBLIC_TWITTER_SECRET as string,
//   callback: `${URL}/api/callback`,
//   scopes: ["users.read"],
// });

// export async function GET(req: NextRequest) {
//   try {
//     const { code, state } = req.query;

//     // Add logs to track state and code
//     console.log("OAuth Callback Params:", { code, state });

//     if (state !== STATE) {
//       console.error("State mismatch");
//       return NextResponse.json(
//         { error: "State doesn't match" },
//         { status: 500 }
//       );
//     }

//     // Request access token and handle errors
//     await authClient.requestAccessToken(code as string);
//     console.log("Access token successfully retrieved");

//     return NextResponse.redirect("/");
//   } catch (error) {
//     console.error("Error in callback handling:", error);
//     return NextResponse.json(
//       { error: "Callback Error", details: error },
//       { status: 500 }
//     );
//   }
// }
