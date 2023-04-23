"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { SearchInput } from "./components/searchinput";
import supabase from "@/components/lib/supabase-client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import { Expense } from "@/components/types/collection";

const Shopping = () => {
  //get expenses from supabase

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    expensesData();
  }, [user]);

  const expensesData = async () => {
    const { data: expenseData, error } = await supabase
      .from("expenses")
      .select("*")
      .ilike("category", "food/%")
      .eq("profile_id", user?.id);
    if (error) console.log("error", error);
    else {
      setExpenses(expenseData);
    }
  };

  console.log("expenses", expensesData);
  console.log("expensesShopping", expenses);

  const router = useRouter();
  return (
    <div className={styles.main}>
      <h1>Shopping</h1>
      <div>
        <button onClick={() => router.push("/shopping")}>shopping</button>
        <button onClick={() => router.push("/shopping/categories")}>
          categories
        </button>
        <div>
          <button onClick={() => router.push("shopping/addproducts")}>
            Add products
          </button>
        </div>
      </div>
      <SearchInput expenses={expenses} />
    </div>
  );
};

export default Shopping;
