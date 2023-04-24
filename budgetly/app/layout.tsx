import "server-only";

import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budgetly",
  description: "Keep track of your budget",
};

import { Inter } from "next/font/google";
import { createClient } from "../utils/supabase-server";
import SupabaseProvider from "../components/providers/supabase-provider";
import SupabaseAuthProvider from "../components/providers/supabase-auth-provider";

import Sidebar from "../components/navigation/sidebar/page";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <SupabaseAuthProvider serverSession={session}>
            {children}
          </SupabaseAuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
