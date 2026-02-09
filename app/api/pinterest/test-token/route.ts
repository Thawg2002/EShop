import { NextRequest, NextResponse } from "next/server";
import { getPinterestUserAccount } from "@/lib/pinterest_test";

export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.PINTEREST_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json({ error: "Token not found" }, { status: 500 });
    }

    const accountInfo = await getPinterestUserAccount(accessToken);

    return NextResponse.json({
      success: true,
      accountInfo,
    });
  } catch (error) {
    console.error("Pinterest token test error:", error);
    return NextResponse.json(
      {
        error: "Token test failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
