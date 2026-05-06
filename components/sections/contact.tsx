"use client";
import { useState } from "react";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { GlassCard } from "@/components/shared/glass-card";

export function ContactSectionV2() {
  const [status, setStatus] = useState<string>("");
  return (
    <Section id="contact">
      <SectionHeading eyebrow="Contact" title="Let's build the next flagship frontend experience" />
      <GlassCard className="max-w-2xl" round="2xl" innerClassName="space-y-4 p-6">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(Object.fromEntries(form)) });
            setStatus(res.ok ? "Message sent" : "Failed to send");
          }}
        >
          <input name="name" required placeholder="Name" className="w-full rounded-lg border border-white/20 bg-black/20 p-3" />
          <input name="email" required placeholder="Email" className="w-full rounded-lg border border-white/20 bg-black/20 p-3" />
          <textarea name="message" required placeholder="Message" className="h-36 w-full rounded-lg border border-white/20 bg-black/20 p-3" />
          <div className="flex flex-wrap gap-3">
            <MagneticButton type="submit">Send Message</MagneticButton>
            <a href="https://calendly.com" target="_blank" rel="noreferrer">
              <MagneticButton type="button">Book a Call</MagneticButton>
            </a>
          </div>
          {status && <p className="text-sm text-muted">{status}</p>}
        </form>
      </GlassCard>
    </Section>
  );
}
