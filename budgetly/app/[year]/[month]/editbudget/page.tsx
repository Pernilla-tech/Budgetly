"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import CustomSelect from "@/components/components/ui/CustomSelect";
import CustomButton from "@/components/components/ui/CustomButton";
import supabase from "@/components/lib/supabase-client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import CustomInput from "@/components/components/ui/CustomInput";

type Params = {
  params: {
    year: string;
    month: string;
  };
};
const Editbudget = ({ params: { month, year } }: Params) => {
  // const [selectedMonth, setSelectedMonth] = useState(parseInt(month, 10));
  const [selectedMonth, setSelectedMonth] = useState(
    month.toString().padStart(2, "0")
  );
  const [selectedYear, setSelectedYear] = useState(parseInt(year, 10));
  const [budget, setBudget] = useState(0);

  const { user } = useAuth();
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
      .from("budgets")
      .update({
        budget: budget,
        month: selectedMonth,
        year: selectedYear,
        profile_id: user?.id ?? "",
      })
      .eq("profile_id", user?.id ?? "")
      .eq("month", month)
      .eq("year", year)
      .single();
    if (error) throw error;
    route.push(`/${year}/${parseInt(month, 10)}/expenses`);
  };

  const optionsMonth = [
    { value: "01", label: "Januari" },
    { value: "02", label: "Februari" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "Juni" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
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

  useEffect(() => {
    setSelectedMonth(month.toString().padStart(2, "0"));
  }, [month]);

  return (
    <div className={styles.main}>
      <h1 className={styles.description}>Edit Monthly budget</h1>
      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <CustomInput
            placeholder="lägg till månadsbudget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            defaultValue={budget}
          />

          <CustomSelect
            className={styles.select}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(String(e.target.value))}
            options={optionsMonth}
          />

          <CustomSelect
            className={styles.select}
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            options={optionsYear}
          />

          <CustomButton
            type="submit"
            text="Add"
            variant="contained"
            size="medium"
          />
        </form>
      </div>
    </div>
  );
};

export default Editbudget;
