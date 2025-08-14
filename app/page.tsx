"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <div className="lg:flex lg:items-center lg:gap-12">
        <div className="relative z-10 mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left">
          <Link
            href="/"
            className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3 lg:ml-0"
          >
            <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">
              New
            </span>
            <span className="text-sm">Reusable ShadCN UI Blocks</span>
            <span className="bg-(--color-border) block h-4 w-px"></span>
            <ArrowRight className="size-4" />
          </Link>

          <h1 className="mt-10 text-balance text-4xl font-bold md:text-5xl xl:text-5xl">
            Beautifully Crafted, Production-Ready Components
          </h1>
          <p className="mt-8 text-lg text-muted-foreground">
            A growing collection of responsive, accessible, and fully
            customizable ShadCN UI blocks. Perfect for startups, SaaS products,
            and client projects.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="px-5 text-base">
              <Link href="#components">
                <span className="text-nowrap">Browse Components</span>
              </Link>
            </Button>
            <Button
              key={2}
              asChild
              size="lg"
              variant="ghost"
              className="px-5 text-base"
            >
              <Link href="#contact">
                <span className="text-nowrap">Contact</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -mx-4 rounded-3xl p-3 lg:col-span-3">
        <div className="relative">
          <div className="bg-radial-[at_65%_25%] to-background z-1 -inset-17 absolute from-transparent to-40%"></div>
          <Image
            className="hidden dark:block rounded-xl shadow-lg"
            src="/test.png"
            alt="UI component preview in dark mode"
            width={1600}
            height={1000}
          />
          <Image
            className="dark:hidden rounded-xl shadow-lg"
            src="/test.png"
            alt="UI component preview in light mode"
            width={1600}
            height={1000}
          />
        </div>
      </div>
    </>
  );
}
