import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio-content";

/**
 * Social share card, generated at build time from the same `profile` object
 * that drives the page metadata. Replaces a static PNG that still showed the
 * previous site's tech-icon collage (Vue, Laravel, MongoDB…), which no longer
 * matched the bio.
 */
export const alt = `${profile.name} — ${profile.role}, ${profile.location}`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            color: "#a78bfa",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {profile.role} · {profile.location}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            lineHeight: 1.4,
            color: "#a1a1aa",
            maxWidth: 960,
          }}
        >
          React · Next.js · TypeScript · GraphQL — immersive digital
          experiences where design, motion and engineering intersect.
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#71717a",
          }}
        >
          <span>／ryankwan.dev</span>
          <span>Currently @ {profile.currently}</span>
        </div>
      </div>
    ),
    size,
  );
}
