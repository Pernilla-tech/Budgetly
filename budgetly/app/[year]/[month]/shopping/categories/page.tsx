"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import supabase from "@/components/lib/supabase-client";
import { GroupExpense, GroupExpenseFood } from "@/components/types/collection";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    groupedExpensesData();
  }, [user]);

  const groupedExpensesData = async () => {
    const { data: groupedExpensesData, error } = await supabase
      .from("grouped_food_expenses_view")
      .select("*")

      .eq("profile_id", user?.id);
    // .eq("month", month)
    // .eq("year", year);
    if (error) console.log("error", error);
    else {
      setGroupedExpenses(groupedExpensesData);
    }
  };

  return (
    <>
      <div>
        <h1>Categories</h1>
        <button onClick={() => router.push(`/${year}/${month}/shopping`)}>
          shopping
        </button>
      </div>

      {groupedExpenses.map((categoryTotal) => {
        return (
          <div
            key={categoryTotal.group_category}
            style={{
              background: "#2b2c4b",
              marginBottom: "10px",
              borderRadius: "12px",
              padding: "10px",
            }}
          >
            <div>
              {categoryTotal.group_category} totalt: {categoryTotal.sum_price}
              kr
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Categories;
