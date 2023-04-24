"use client";
import { Inter } from "next/font/google";

import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

import { Metadata } from "next";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import MuiButton from "@/components/components/ui/muibutton";
import supabase from "@/components/lib/supabase-client";
import { Budgets, GroupExpense } from "@/components/types/collection";

export const metadata: Metadata = {
  title: "Budgetly",
  description: "Keep track of your budget",
};

type Params = {
  params: {
    month: string;
    year: string;
  };
};
export default function Overview({ params: { year, month } }: Params) {
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
      <div>Overview</div>

      <div style={{ background: "pink" }}>
        <p>budget: {budget?.budget}</p>
      </div>

      <div>
        <div
          style={{ background: "#2B2C4B" }}
          onClick={() =>
            router.push(
              `/${budget?.year ?? year}/${budget?.month ?? month}/expenses`
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
        href={`/${year}/${month}/addbudget`}
        size="small"
        variant="contained"
        text="Add Budget"
      />
    </main>
  );
}
