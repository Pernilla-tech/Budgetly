"use client";
import { Inter } from "next/font/google";

import styles from "./page.module.css";
import { useAuth } from "../components/providers/supabase-auth-provider";

const inter = Inter({ subsets: ["latin"] });

import { Metadata } from "next";

import { useCallback, useEffect, useState } from "react";
import supabase from "../lib/supabase-client";
import MuiButton from "../components/ui/muibutton";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Budgets, GroupExpense } from "../types/collection";

export const metadata: Metadata = {
  title: "Budgetly",
  description: "Keep track of your budget",
};

export default function Home() {
  const [month] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());
  const [budget, setBudget] = useState<Budgets | null>(null);

  const [totalExpenses, setTotalExpenses] = useState<GroupExpense[]>([]);

  const { user } = useAuth();
  const router = useRouter();

  const getBudget = useCallback(async () => {
    const { data, error } = await supabase
      .from("budgets")
      .select("*")
      .eq("profile_id", user?.id ?? "")
      .eq("month", month)
      .eq("year", year)
      .single();
    if (error) throw error;
    if (data != null) {
      setBudget(data);
    }
  }, [month, user?.id, year]);

  const getExpenses = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("grouped_expenses_view")
        .select("*")
        .eq("profile_id", user?.id)
        .order("sum_price", { ascending: false });
      if (error) throw error;
      if (data != null) {
        setTotalExpenses(data as GroupExpense[]);
        console.log({ data });
      }
    } catch (error: any) {
      alert(error.message);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id != null) {
      getBudget();
      getExpenses();
    }
  }, [getBudget, getExpenses, user?.id]);

  const sum = totalExpenses.reduce(
    (total: number, expense: GroupExpense) => total + (expense.sum_price ?? 0),
    0
  );

  const left = (budget?.budget ?? 0) - sum;

  return (
    <main className={styles.main}>
      <div>Välkommen {user?.name}</div>

      <div>Overview</div>

      <div style={{ background: "pink" }}>
        <p>budget: {budget?.budget}</p>
      </div>

      <div>
        <div
          style={{ background: "#2B2C4B" }}
          onClick={() =>
            router.push(
              `/expenses/${budget?.year ?? year}/${budget?.month ?? month}`
            )
          }
          role="button"
          className="button"
        >
          <h2>Expenses</h2>

          <div>
            <p>This month you have spend {sum}kr</p>
          </div>
          <p>Left {left} kr</p>
        </div>
      </div>

      <MuiButton
        as={NextLink}
        href="/addbudget"
        size="small"
        variant="contained"
        text="Add Budget"
      />
    </main>
  );
}
