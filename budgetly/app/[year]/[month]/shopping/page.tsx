"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { SearchInput } from "./components/searchinput";
import supabase from "@/components/lib/supabase-client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import { Expense } from "@/components/types/collection";
import CustomButton from "@/components/components/ui/CustomButton";

type Params = {
  params: {
    year: string;
    month: string;
  };
};

const Shopping = ({ params: { month, year } }: Params) => {
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
      <>
        <CustomButton
          onClick={() => router.push(`/${year}/${month}/shopping`)}
          text="Shopping"
        />
        <CustomButton
          onClick={() => router.push(`/${year}/${month}/shopping/categories`)}
          text="categories"
        />

        <>
          <CustomButton
            onClick={() =>
              router.push(`/${year}/${month}/shopping/addproducts`)
            }
            text="Add products"
          />
        </>
      </>
      <SearchInput expenses={expenses} />
    </div>
  );
};

export default Shopping;
