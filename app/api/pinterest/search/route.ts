import { NextRequest, NextResponse } from "next/server";
import { searchPinterestPins, transformPinterestPin } from "@/lib/pinterest";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // Get search query from URL params
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 },
      );
    }

    // Get Pinterest access token from cookie or environment
    const cookieStore = await cookies();
    const accessToken =
      cookieStore.get("pinterest_token")?.value ||
      process.env.PINTEREST_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        {
          error:
            "Pinterest access token not found. Please connect your account.",
        },
        { status: 401 },
      );
    }

    // Search Pinterest
    const pins = await searchPinterestPins(query, accessToken);

    // Transform to our format
    const transformedPins = pins.map(transformPinterestPin);

    return NextResponse.json({
      success: true,
      query,
      count: transformedPins.length,
      data: transformedPins,
    });
  } catch (error) {
    console.error("Pinterest search error:", error);
    return NextResponse.json(
      {
        error: "Failed to search Pinterest",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
