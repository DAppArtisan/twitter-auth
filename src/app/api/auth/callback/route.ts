import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { code } = req.body;

      if (!code) {
        return res
          .status(400)
          .json({ message: "Authorization code is missing." });
      }

      const clientId = process.env.NEXT_PUBLIC_TWITTER_ID;
      const clientSecret = process.env.NEXT_PUBLIC_TWITTER_SECRET;

      if (!clientId || !clientSecret) {
        return res
          .status(500)
          .json({ message: "Twitter client credentials are missing." });
      }

      const redirectUri = "https://twitter-auth-nine.vercel.app/api/callback";
      const codeVerifier = "random_code_challenge"; // This should be dynamically generated and stored in a session or local storage

      // Encode the client credentials
      const base64EncodedCredentials = Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64");

      // Exchange authorization code for an access token
      const tokenResponse = await axios.post(
        "https://api.twitter.com/2/oauth2/token",
        new URLSearchParams({
          code,
          grant_type: "authorization_code",
          client_id: clientId,
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

      if (!access_token) {
        return res
          .status(500)
          .json({ message: "Failed to retrieve access token." });
      }

      // Fetch user information using the access token
      const userResponse = await axios.get(
        "https://api.twitter.com/2/users/me",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const user = userResponse.data;

      return res.status(200).json({ accessToken: access_token, user });
    } catch (error) {
      console.error("Error in Twitter OAuth process:", error);

      if (axios.isAxiosError(error)) {
        const axiosError = error.response?.data || error.message;
        return res.status(500).json({
          message: "Failed to authenticate with Twitter.",
          error: axiosError,
        });
      } else {
        return res
          .status(500)
          .json({ message: "An unexpected error occurred.", error: "error " });
      }
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
