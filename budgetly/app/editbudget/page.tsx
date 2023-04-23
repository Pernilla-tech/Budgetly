"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import MuiButton from "@/components/components/ui/muibutton";
import supabase from "@/components/lib/supabase-client";
import React, { useState } from "react";

const Editbudget = () => {
  const [month, setMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [year, setYear] = useState(new Date().getFullYear());
  const [budget, setBudget] = useState(0);

  console.log("month", month);

  const { user } = useAuth();

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
      .single();
    if (error) throw error;
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
            onChange={(e) => setMonth(e.target.value)}
            // defaultValue={month}
          >
            <option value="januari">Januari</option>
            <option value="februari">Februari </option>
            <option value="mars">Mars</option>
            <option value="april">April</option>
            <option value="maj">Maj</option>
            <option value="juni">Juni</option>
            <option value="juli">Juli</option>
            <option value="augusti">augusti</option>
            <option value="september">September</option>
            <option value="oktober">Oktober</option>
            <option value="november">November</option>
            <option value="december">December</option>
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
            href="/"
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
