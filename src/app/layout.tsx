import { PageLayout } from "./client";
import "./global.css";

export const metadata = {
  title: "ARO Dashboard",
  description: "ARO Dashboard",
};



import { Albert_Sans, Alexandria } from "next/font/google";
import { cn } from "@nextui-org/react";
import ContextProvider from "@/config/context";
import Head from "next/head";
// import { Head } from "next/document";
const albertSans = Albert_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal',],
  variable: '--font-albert-sans',
});

const alexandria = Alexandria({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  variable: '--font-alexandria',
});






const fonts = [albertSans, alexandria]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookies = null

  return (
    <html lang="en" className={cn("dark", fonts.map(item => item.variable).join(" "), "font-AlbertSans")}>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <body>
        <ContextProvider cookies={cookies}>
          <PageLayout>{children}</PageLayout>
        </ContextProvider>
      </body>

    </html>
  );
}
