import { ClerkProvider } from "@clerk/nextjs";

export const metadat = {
  title: "Threads",
  description: "Threads clone by Thathsara Hewage using Next.js 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider></ClerkProvider>;
}
