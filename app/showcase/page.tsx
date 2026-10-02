import { redirect } from "next/navigation";
import { showcaseItems } from "@/data/showcase";

/** No landing copy of its own: open the first item so the body is never empty. */
export default function ShowcaseIndexPage() {
  redirect(`/showcase/${showcaseItems[0].slug}`);
}
