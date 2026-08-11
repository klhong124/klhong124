import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { ContactForm } from "@/components/ui/contact-form";
import { profile } from "@/data/portfolio-content";

/**
 * Server component. Only the form itself is interactive, so only the form ships
 * JavaScript — and it works without it.
 */
export function ContactSection() {
  return (
    <Section id="contact" labelledBy="contact-heading">
      <SectionHeading
        id="contact-heading"
        eyebrow="Contact"
        title="Get in touch"
        description="Open to frontend engineering roles in London or remote across the UK. Send a message or email me directly — whichever you prefer."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <GlassCard round="2xl" innerClassName="p-6 sm:p-8">
          <ContactForm />
        </GlassCard>

        <GlassCard round="2xl" innerClassName="p-6 sm:p-8">
          <h3 className="text-fluid-lg font-semibold text-fg">Prefer email?</h3>
          <p className="mt-3 text-muted">
            No form, no tracking, straight to my inbox.
          </p>
          <a
            href={`mailto:${profile.email}?subject=Frontend%20engineering%20enquiry`}
            className="mt-4 inline-flex min-h-11 items-center break-all text-fg underline decoration-accent/60 underline-offset-4 transition-colors hover:decoration-accent"
          >
            {profile.email}
          </a>

          <h3 className="mt-8 text-fluid-lg font-semibold text-fg">Elsewhere</h3>
          <ul className="mt-3 space-y-1">
            {profile.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-accent">
                    &#8599;
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </Section>
  );
}
