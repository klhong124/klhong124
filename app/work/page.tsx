import { Metadata } from "next";
import { WorkPageInner } from "./work-page-inner";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return <WorkPageInner />;
}