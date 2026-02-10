// Pinterest API utilities
const PINTEREST_API_BASE = "https://api.pinterest.com/v5";

export interface PinterestPin {
  id: string;
  title?: string;
  description?: string;
  link?: string;
  media?: {
    images?: {
      "400x300"?: { url: string };
      "600x"?: { url: string };
      originals?: { url: string };
    };
  };
}

export interface PinterestSearchResponse {
  items: PinterestPin[];
  bookmark?: string;
}

/**
 * Search Pinterest pins by keyword
 * @param query - Search keyword (e.g., "fashion", "thời trang")
 * @param accessToken - Pinterest API access token
 * @returns Array of Pinterest pins
 */
export async function searchPinterestPins(
  query: string,
  accessToken: string,
): Promise<PinterestPin[]> {
  try {
    const url = `${PINTEREST_API_BASE}/search/pins?query=${encodeURIComponent(query)}&limit=20`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Pinterest API error: ${response.status} ${response.statusText}`,
      );
    }

    const data: PinterestSearchResponse = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching Pinterest pins:", error);
    throw error;
  }
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(
  code: string,
): Promise<{ access_token: string; refresh_token?: string }> {
  const clientId = process.env.PINTEREST_APP_ID;
  const clientSecret = process.env.PINTEREST_APP_SECRET;
  const redirectUri =
    process.env.PINTEREST_REDIRECT_URI ||
    "http://localhost:5173/api/auth/pinterest/callback";

  const response = await fetch("https://api.pinterest.com/v5/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Token exchange failed: ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}

/**
 * Transform Pinterest pin to our app format
 */
export function transformPinterestPin(pin: PinterestPin) {
  // Get the best available image URL
  const imageUrl =
    pin.media?.images?.["600x"]?.url ||
    pin.media?.images?.["400x300"]?.url ||
    pin.media?.images?.originals?.url ||
    "";

  return {
    id: pin.id,
    url: imageUrl,
    title: pin.title || pin.description || "Pinterest Pin",
    link: pin.link || `https://pinterest.com/pin/${pin.id}`,
  };
}
