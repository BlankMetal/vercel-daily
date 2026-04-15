import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import SubscriptionProvider from "./components/subscription-provider";
import { getPublicationConfig } from "./lib/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPublicationConfig();
  const { seo, publicationName } = config.data;

  return {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000"              
    ),
    title: {
      template: seo.titleTemplate,
      default: seo.defaultTitle,
    },
    description: seo.defaultDescription,
    openGraph: {
      siteName: publicationName,
      locale: "en_US",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SubscriptionProvider>
          <Header />
          <div className="flex flex-col flex-1">{children}</div>
          <Footer />
        </SubscriptionProvider>
      </body>
    </html>
  );
}
