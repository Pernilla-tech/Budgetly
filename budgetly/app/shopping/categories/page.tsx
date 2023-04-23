"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import supabase from "@/components/lib/supabase-client";
import { GroupExpense } from "@/components/types/collection";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [groupedExpenses, setGroupedExpenses] = useState<{
    [x: string]: any;
  }>([]); //är en arrray av objekt o varje objekt kan ha vilken egenskap som helst som key

  useEffect(() => {
    groupedExpensesData();
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

  return (
    <>
      <div>
        <h1>Categories</h1>
        <button onClick={() => router.push("/shopping")}>shopping</button>
        <button onClick={() => router.push("/categories")}>categories</button>
      </div>

      {groupedExpenses.map((categoryTotal: GroupExpense) => {
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
