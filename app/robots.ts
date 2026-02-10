import { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://xxii-collective.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/ho-so", "/gio-hang", "/thanh-toan"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
