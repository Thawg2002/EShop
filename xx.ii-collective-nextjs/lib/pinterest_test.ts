const PINTEREST_API_BASE = "https://api.pinterest.com/v5";

/**
 * Get user account info to test the token
 */
export async function getPinterestUserAccount(
  accessToken: string,
): Promise<any> {
  const url = `${PINTEREST_API_BASE}/user_account`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Testing token failed: ${response.status} ${response.statusText}. Details: ${JSON.stringify(errorData)}`,
    );
  }

  return await response.json();
}
