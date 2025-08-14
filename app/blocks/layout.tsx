"use client";

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full overflow-x-auto">{children}</main>;
}
