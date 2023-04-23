"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import MuiButton from "@/components/components/ui/muibutton";
import supabase from "@/components/lib/supabase-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Editbudget = () => {
  const [month, setMonth] = useState(new Date().getDate() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [budget, setBudget] = useState(0);

  console.log("month", month);

  const { user } = useAuth();
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
      .from("budgets")
      .update({
        budget: budget,
        month: month,
        year: year,
        profile_id: user?.id ?? "",
      })
      .eq("profile_id", user?.id ?? "")
      .eq("month", month)
      .eq("year", year)
      .single();
    if (error) throw error;
    route.push("/");
  };

  return (
    <>
      <div>
        Edit Monthly budget
        <form onSubmit={handleSubmit}>
          <input
            placeholder="lägg till månadsbudget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            defaultValue={budget}
          />
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            // defaultValue={month}
          >
            <option value="1">Januari</option>
            <option value="2">Februari </option>
            <option value="3">Mars</option>
            <option value="4">April</option>
            <option value="5">Maj</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">augusti</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            <option value={new Date().getFullYear()}>
              {new Date().getFullYear()}
            </option>
            <option value={new Date().getFullYear() + 1}>
              {new Date().getFullYear() + 1}
            </option>
            <option value={new Date().getFullYear() + 2}>
              {new Date().getFullYear() + 2}
            </option>
          </select>
          <MuiButton
            type="submit"
            text="Add"
            variant="contained"
            size="medium"
          />
        </form>
      </div>
    </>
  );
};

export default Editbudget;
