"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import supabase from "@/components/lib/supabase-client";
import React, { FormEventHandler, useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

import CustomSelect from "@/components/components/ui/CustomSelect";
import CustomButton from "@/components/components/ui/CustomButton";
import CustomInput from "@/components/components/ui/CustomInput";

type Params = {
  params: {
    year: string;
    month: string;
  };
};

const AddBudget = ({ params: { month, year } }: Params) => {
  // const [selectedMonth, setSelectedMonth] = useState(parseInt(month, 10));
  const [selectedMonth, setSelectedMonth] = useState(
    month.toString().padStart(2, "0")
  );
  const [selectedYear, setSelectedYear] = useState(parseInt(year, 10));
  const [budget, setBudget] = useState(0);

  console.log(selectedMonth, selectedYear);

  const { user } = useAuth();
  const route = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("budgets")
        .insert({
          budget: budget,
          month: selectedMonth,
          year: selectedYear,
          profile_id: user?.id ?? "",
        })
        .single();
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }

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
      <h1 className={styles.description}>Add Budget</h1>
      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <CustomInput
            placeholder="lägg till månadsbudget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            size="small"
          />

          <CustomSelect
            className={styles.select}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(String(e.target.value))}
            defaultValue={{
              value: month.toString().padStart(2, "0"), // value sätts till en sträng  med två siffror om mån är mindre än 2 siffror, padstart lägger till en 0 i början av strängenför att få en 2 siffrig sträng
              label: optionsMonth[parseInt(month, 10) - 1].label, // värdet för label sätts till månadens namn, parseInt(month, 10) - 1 omvandlar månadens nummer till en siffra och tar bort 1 för att få rätt index i arrayen
            }}
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

export default AddBudget;
