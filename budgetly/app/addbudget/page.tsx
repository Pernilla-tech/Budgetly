"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import supabase from "@/components/lib/supabase-client";
import React, { FormEventHandler, useState } from "react";
import MuiButton from "../../components/ui/muibutton";

const AddBudget = () => {
  const [month, setMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [year, setYear] = useState(new Date().getFullYear());

  console.log("month", month);

  const [budget, setBudget] = useState(0);

  const { user, signOut } = useAuth();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // här vill jag spara månadsbudgeten i databasen. Jag vill också spara månaden och året. Jag vill också spara hur mycket jag har spenderat och hur mycket jag har kvar av budgetet. *//
    try {
      const { error } = await supabase
        .from("budgets")
        .insert({
          budget: budget,
          month: month,
          year: year,
          profile_id: user?.id ?? "",
        })
        .single();
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }

    setBudget(0);
    setMonth("");
    setYear(0);
  };

  return (
    <div>
      AddBudget
      <div>
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
    </div>
  );
};

export default AddBudget;
