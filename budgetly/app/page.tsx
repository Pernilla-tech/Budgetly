"use client";
import { Inter } from "next/font/google";

import styles from "./page.module.css";
import { useAuth } from "../components/providers/supabase-auth-provider";

const inter = Inter({ subsets: ["latin"] });

import { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Budgetly",
  description: "Keep track of your budget",
};

export default function Home() {
  const { user, signOut } = useAuth();

  console.log("user homepage", user?.name);
  return (
    <main className={styles.main}>
      <div>Välkommen {user?.name}</div>

      <div>Overview</div>

      <Link href="/expenses">Expenses</Link>

      <div>
        <p>This month you have spend 2300kr</p>
      </div>

      <button onClick={signOut}>Log out</button>
    </main>
  );
}
