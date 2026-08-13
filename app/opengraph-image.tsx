import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio-content";

/**
 * Social share card, generated at build time from the same `profile` object
 * that drives the page metadata.
 *
 * ImageResponse / Satori cannot run WebGL, so the hero's live R3F scene cannot
 * be rendered here. Instead we composite the pre-captured 3D tech-stack still
 * (`public/images/portfolio.png`) as the background — same icons, same look,
 * just a frozen frame under the typography.
 */
export const alt = `${profile.name} — ${profile.role}, ${profile.location}`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const background = await readFile(join(process.cwd(), "public/og-img-bg.png"));
  const backgroundSrc = `data:image/png;base64,${background.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          color: "#fafafa",
        }}
      >
        {/* Frozen hero 3D stack — cover-cropped to the OG frame. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse has no next/image */}
        <img
          src={backgroundSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        {/* Dark scrim so the name stays readable over the icons. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 70% 45%, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0.88) 55%, rgba(9,9,11,0.94) 100%), linear-gradient(115deg, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.72) 50%, rgba(9,9,11,0.78) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "80px",
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
              color: "#d4d4d8",
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
              color: "#a1a1aa",
            }}
          >
            <span>/ ryankwan.dev</span>
            <span>Currently @ {profile.currently}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
