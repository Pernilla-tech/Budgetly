"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import CustomButton from "@/components/components/ui/CustomButton";
import supabase from "@/components/lib/supabase-client";
import { Expense, GroupExpenseFood } from "@/components/types/collection";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

import React, { useEffect, useState } from "react";
import CategoryAccordion from "./components.tsx/CategoryAccordion";

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

  useEffect(() => {
    groupedExpensesData();
    getExpenses();
  }, [user]);

  const groupedExpensesData = async () => {
    const { data: groupedExpensesData, error } = await supabase
      .from("grouped_food_expenses_view")
      .select("*")

      .eq("profile_id", user?.id);

    if (error) console.log("error", error);
    else {
      setGroupedExpenses(groupedExpensesData);
    }
  };

  const getExpenses = async () => {
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
  };

  return (
    <div className={styles.main}>
      <h1>Categories</h1>

      <div className={styles.buttonWrapper}>
        <CustomButton
          onClick={() => router.push(`/${year}/${month}/shopping`)}
          text="Products"
          // sx={{ background: "#4A4D78" }}
        />
        <CustomButton
          onClick={() => router.push(`/${year}/${month}/shopping/categories`)}
          text="categories"
          // sx={{ backgroundColor: "#0F102B" }}
        />
      </div>

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
