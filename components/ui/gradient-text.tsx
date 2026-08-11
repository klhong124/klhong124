import { cn } from "@/utils/cn";

export function GradientText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent", className)}>
      {children}
    </span>
  );
}
