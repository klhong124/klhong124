import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { demos } from "@/components/showcase/demos";
import { getShowcaseItem, showcaseItems } from "./showcase";

const itemFile = (slug: string) => path.join(process.cwd(), "components/showcase/items", `${slug}.tsx`);
const read = (slug: string) => readFileSync(itemFile(slug), "utf8");

/** Package names a file imports: "motion/react" is "motion", "@scope/pkg/x" is "@scope/pkg". */
function importedPackages(code: string) {
  const specifiers = [...code.matchAll(/from\s+["']([^"']+)["']/g)].map((match) => match[1]);
  return new Set(
    specifiers
      .filter((specifier) => !specifier.startsWith("."))
      .map((specifier) => specifier.split("/").slice(0, specifier.startsWith("@") ? 2 : 1).join("/")),
  );
}

/**
 * "Copy code" hands a visitor one file, so the file has to stand on its own and
 * the listed dependencies have to be the ones it actually needs.
 */
describe("showcase registry", () => {
  it("has unique slugs", () => {
    const slugs = showcaseItems.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves every item by slug", () => {
    for (const item of showcaseItems) {
      expect(getShowcaseItem(item.slug)?.title).toBe(item.title);
    }
    expect(getShowcaseItem("missing")).toBeUndefined();
  });

  it("has a source file named after every slug", () => {
    for (const item of showcaseItems) {
      expect(existsSync(itemFile(item.slug)), `${item.slug}.tsx is missing`).toBe(true);
    }
  });

  it("has a live demo for every item, and no orphan demos", () => {
    expect(Object.keys(demos).sort()).toEqual(showcaseItems.map((item) => item.slug).sort());
  });

  it("gives every demo uniquely named controls", () => {
    for (const [slug, demo] of Object.entries(demos)) {
      const names = demo.controls.map((control) => control.name);
      expect(new Set(names).size, slug).toBe(names.length);
    }
  });

  it("gives every item a summary and a prompt", () => {
    for (const item of showcaseItems) {
      expect(item.summary.trim(), `${item.slug} summary`).not.toBe("");
      expect(item.prompt.trim(), `${item.slug} prompt`).not.toBe("");
    }
  });

  it("keeps item files self-contained", () => {
    for (const item of showcaseItems) {
      expect(read(item.slug), `${item.slug}.tsx imports from @/`).not.toMatch(/from\s+["']@\//);
    }
  });

  it("lists exactly the packages each item imports", () => {
    for (const item of showcaseItems) {
      expect([...importedPackages(read(item.slug))].sort(), item.slug).toEqual([...item.deps].sort());
    }
  });
});
