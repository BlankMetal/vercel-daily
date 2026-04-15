import { ImageResponse } from "next/og";
import { getPublicationConfig } from "./lib/api";

export const alt = "Vercel Daily News";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const config = await getPublicationConfig();
  const { publicationName, seo } = config.data;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #000 0%, #111 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {publicationName}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            textAlign: "center",
            marginTop: 24,
            maxWidth: 800,
            lineHeight: 1.5,
          }}
        >
          {seo.defaultDescription}
        </div>
      </div>
    ),
    { ...size }
  );
}
