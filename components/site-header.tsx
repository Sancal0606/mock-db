import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/compare", label: "Compare" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          mock-db
        </Link>
        <nav className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          <ul className="flex items-center gap-1 sm:gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
