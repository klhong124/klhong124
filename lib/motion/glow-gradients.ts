/**
 * Conic glow gradients shared by GlassCard and the hero's GlowingCard.
 *
 * These were duplicated between the two components with roughly 90% identical
 * text, so a colour tweak had to be made twice and inevitably was not.
 */

export const GLOW_GRADIENT_LIGHT = `radial-gradient(circle, #7dd3fc 12%, #7dd3fc00 22%),
  radial-gradient(circle at 40% 40%, #a78bfa 6%, #a78bfa00 16%),
  radial-gradient(circle at 60% 60%, #6ee7b7 10%, #6ee7b700 20%),
  radial-gradient(circle at 40% 60%, #fde047 8%, #fde04700 18%),
  repeating-conic-gradient(
    from 236.84deg at 50% 50%,
    #7dd3fc 0%,
    #a78bfa calc(25% / 5),
    #6ee7b7 calc(50% / 5),
    #fde047 calc(75% / 5),
    #7dd3fc calc(100% / 5)
  )`;

export const GLOW_GRADIENT_DARK = `radial-gradient(circle, rgb(var(--accent) / 0.45) 10%, transparent 22%),
  radial-gradient(circle at 35% 30%, #a78bfa 8%, #a78bfa00 18%),
  radial-gradient(circle at 65% 55%, #22d3ee 8%, #22d3ee00 18%),
  radial-gradient(circle at 45% 65%, #c4b5fd 6%, #c4b5fd00 16%),
  repeating-conic-gradient(
    from 236.84deg at 50% 50%,
    #a78bfa 0%,
    #22d3ee calc(25% / 5),
    #c4b5fd calc(50% / 5),
    #fde68a calc(75% / 5),
    #a78bfa calc(100% / 5)
  )`;
