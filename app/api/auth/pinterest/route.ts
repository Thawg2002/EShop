import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.PINTEREST_APP_ID;
  const redirectUri =
    process.env.PINTEREST_REDIRECT_URI ||
    "http://localhost:5173/api/auth/pinterest/callback";

  // Scopes needed for search and reading pins
  const scopes = "pins:read,boards:read,user_accounts:read";

  const pinterestAuthUrl = `https://www.pinterest.com/oauth/?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes}`;

  return NextResponse.redirect(pinterestAuthUrl);
}
