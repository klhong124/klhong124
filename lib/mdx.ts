import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "content", "projects");

export function getAllProjectSlugs() {
  return fs.readdirSync(projectsDir).filter((file) => file.endsWith(".mdx")).map((file) => file.replace(".mdx", ""));
}

export function getProjectBySlug(slug: string) {
  const raw = fs.readFileSync(path.join(projectsDir, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}
