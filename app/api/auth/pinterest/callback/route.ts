import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/pinterest";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        new URL(`/cam-hung?error=${error}`, request.url),
      );
    }

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    // Exchange code for token
    const tokenData = await exchangeCodeForToken(code);

    // Save token in cookie (secure, httpOnly for safety)
    const cookieStore = await cookies();
    cookieStore.set("pinterest_token", tokenData.access_token, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Redirect back to inspiration page
    return NextResponse.redirect(new URL("/cam-hung", request.url));
  } catch (error) {
    console.error("Pinterest callback error:", error);
    return NextResponse.redirect(
      new URL("/cam-hung?error=token_exchange_failed", request.url),
    );
  }
}
