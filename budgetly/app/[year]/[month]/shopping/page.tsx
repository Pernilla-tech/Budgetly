"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { SearchInput } from "./components/searchinput";
import supabase from "@/components/lib/supabase-client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import { Expense } from "@/components/types/collection";

type Params = {
  params: {
    year: string;
    month: string;
  };
};

const Shopping = ({ params: { month, year } }: Params) => {
  //get expenses from supabase

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    expensesData();
  }, [user]);

  const expensesData = useCallback(async () => {
    const { data: expenseData, error } = await supabase
      .from("expenses")
      .select("*")
      .ilike("category", "food/%")
      .eq("profile_id", user?.id)
      .eq("month", month)
      .eq("year", year);
    if (error) console.log("error", error);
    else {
      setExpenses(expenseData);
    }
  }, [user, month, year]);

  console.log("expenses", expensesData);
  console.log("expensesShopping", expenses);

  const router = useRouter();
  return (
    <div className={styles.main}>
      <h1>Shopping</h1>
      <div>
        <button onClick={() => router.push(`/${year}/${month}/shopping`)}>
          shopping
        </button>
        <button
          onClick={() => router.push(`/${year}/${month}/shopping/categories`)}
        >
          categories
        </button>
        <div>
          <button
            onClick={() =>
              router.push(`/${year}/${month}/shopping/addproducts`)
            }
          >
            Add products
          </button>
        </div>
      </div>
      <SearchInput expenses={expenses} />
    </div>
  );
};

export default Shopping;
