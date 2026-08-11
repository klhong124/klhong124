export type Principle = {
  title: string;
  detail: string;
};

export const bio = {
  intro:
    "I build frontend systems that hold up as products and teams grow — typed data at the boundaries, a design system people actually reuse, and motion that helps you read the page rather than showing off.",
  philosophy: [
    {
      title: "Build the primitives first",
      detail:
        "Shared components and tokens before features. It costs more on day one and far less every day after, because the next screen is assembly rather than invention.",
    },
    {
      title: "Motion is information",
      detail:
        "Animation should tell you where you are, what changed, and what is loading. If it does not do one of those, it is decoration, and decoration gets a reduced-motion switch.",
    },
    {
      title: "Types at the edges",
      detail:
        "Validate API responses and content at the boundary so the rest of the app can trust its data. Most UI bugs I have chased were really shape bugs wearing a costume.",
    },
    {
      title: "Optimise for the next maintainer",
      detail:
        "Fast to ship and fast to change are the same goal at different timescales. I favour boring, obvious code and leave the cleverness for the interaction design.",
    },
  ] satisfies Principle[],
};
