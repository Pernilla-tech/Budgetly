"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import CustomSelect from "@/components/components/ui/CustomSelect";
import CustomButton from "@/components/components/ui/CustomButton";
import supabase from "@/components/lib/supabase-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CustomInput from "@/components/components/ui/CustomInput";

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

  const optionsMonth = [
    { value: 1, label: "Januari" },
    { value: 2, label: "Februari" },
    { value: 3, label: "Mars" },
    { value: 4, label: "April" },
    { value: 5, label: "Maj" },
    { value: 6, label: "Juni" },
    { value: 7, label: "Juli" },
    { value: 8, label: "Augusti" },
    { value: 9, label: "September" },
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const optionsYear = [
    {
      value: new Date().getFullYear() - 1,
      label: (new Date().getFullYear() - 1).toString(),
    },
    {
      value: new Date().getFullYear(),
      label: new Date().getFullYear().toString(),
    },
    {
      value: new Date().getFullYear() + 1,
      label: (new Date().getFullYear() + 1).toString(),
    },
    {
      value: new Date().getFullYear() + 2,
      label: (new Date().getFullYear() + 2).toString(),
    },
  ];

  return (
    <>
      <>
        Edit Monthly budget
        <form onSubmit={handleSubmit}>
          <CustomInput
            placeholder="lägg till månadsbudget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            defaultValue={budget}
          />

          <CustomSelect
            value={month}
            label="Month"
            onChange={(e) => setBudget(Number(e.target.value))}
            options={optionsMonth}
          />

          <CustomSelect
            label="Year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            options={optionsYear}
          />

          <CustomButton
            type="submit"
            text="Add"
            variant="contained"
            size="medium"
          />
        </form>
      </>
    </>
  );
};

export default Editbudget;
