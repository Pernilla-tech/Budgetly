"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import CustomButton from "@/components/components/ui/CustomButton";
import supabase from "@/components/lib/supabase-client";
import { Expense, GroupExpenseFood } from "@/components/types/collection";
import { useRouter } from "next/navigation";
import styles from "./categories.module.css";

import React, { useCallback, useEffect, useState } from "react";
import CategoryAccordion from "./components.tsx/CategoryAccordion";
import { ShoppingSvg } from "@/components/public/ShoppingSvg";

type Params = {
  params: {
    year: string;
    month: string;
  };
};

const Categories = ({ params: { year, month } }: Params) => {
  const [groupedExpenses, setGroupedExpenses] = useState<GroupExpenseFood[]>(
    []
  );
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const router = useRouter();
  const { user } = useAuth();

  const getExpenses = useCallback(async () => {
    const { data: expensesData, error } = await supabase
      .from("expenses")
      .select("*")
      .ilike("category", "food/%")
      .eq("profile_id", user?.id)
      .eq("month", month)
      .eq("year", year);

    if (error) console.log("error", error);
    else {
      setExpenses(expensesData);
    }
  }, [user, month, year]);

  const groupedExpensesData = useCallback(async () => {
    const { data: groupedExpensesData, error } = await supabase
      .from("grouped_food_expenses_view")
      .select("*")
      .eq("profile_id", user?.id)
      .eq("month", month)
      .eq("year", year);

    if (error) console.log("error", error);
    else {
      setGroupedExpenses(groupedExpensesData);
    }
  }, [user]);

  useEffect(() => {
    groupedExpensesData();
    getExpenses();
  }, [getExpenses, groupedExpensesData, user]);

  return (
    <div className={styles.main}>
      <h1>Categories</h1>

      <div className={styles.buttonWrapper}>
        <CustomButton
          onClick={() => router.push(`/${year}/${month}/shopping`)}
          text="Products"
        />
        <CustomButton
          onClick={() => router.push(`/${year}/${month}/shopping/categories`)}
          text="categories"
        />
      </div>

      {expenses.length === 0 && (
        <div className={styles.description}>
          <p>No expenses</p>
          <ShoppingSvg />
        </div>
      )}

      {groupedExpenses.map((categoryTotal) => {
        return (
          <CategoryAccordion
            key={categoryTotal.group_category}
            categoryTotal={categoryTotal}
            categoryTotalSum={categoryTotal.sum_price}
            expenses={expenses}
          />
        );
      })}
    </div>
  );
};

export default Categories;
