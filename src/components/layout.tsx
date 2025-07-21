import Link from "next/link";
import { ReactNode } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header
        className="border-b fixed z-50 top-0 left-0 right-0 backdrop-filter
backdrop-blur bg-background/65 bg-blend-overlay"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                href="/"
                className="flex items-center text-xl font-bold text-foreground"
              >
                <Image
                  src={"/favicon.png"}
                  alt={"logo"}
                  width={60}
                  height={60}
                  className="rounded-full -mr-1"
                />
                Canvas and Console
              </Link>
            </div>
            <div className="flex items-center">
              <ModeToggle />
            </div>
          </div>
        </nav>
      </header>

      <main
        className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[radial-gradient(circle,theme(colors.gray.300)_1px,transparent_1px)] 
    dark:bg-[radial-gradient(circle,theme(colors.gray.700)_1px,transparent_1px)]
    bg-[length:40px_40px]"
      >
        {children}
      </main>

      <footer className="bg-muted border-t">
        <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground mb-3">
            Canvas and Console - Vishal Dhatrika's blog.
          </p>

          <Link
            href="https://vishaldhatrika.me"
            className="text-center text-foreground font-semibold"
          >
            Visit my Portfolio - vishaldhatrika.me
          </Link>
        </div>
      </footer>
    </div>
  );
}
