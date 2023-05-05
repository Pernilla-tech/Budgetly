"use client";
import { Inter } from "next/font/google";

import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CustomIconButton from "@/components/components/ui/CustomIconButton";
import { Metadata } from "next";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Bar } from "react-chartjs-2";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import CustomButton from "@/components/components/ui/CustomButton";
import supabase from "@/components/lib/supabase-client";
import { Budgets, GroupExpense } from "@/components/types/collection";

export const metadata: Metadata = {
  title: "Budgetly",
  description: "Keep track of your budget",
};

type Params = {
  params: {
    month: string;
    year: string;
  };
};
export default function Overview({ params: { year, month } }: Params) {
  const [budget, setBudget] = useState<Budgets | null>(null);
  const [expensesCurrentMonth, setExpensesCurrentMonth] = useState<
    GroupExpense[]
  >([]);
  const [totalExpenses, setTotalExpenses] = useState<GroupExpense[]>([]);

  const { user } = useAuth();
  const router = useRouter();

  const getBudget = useCallback(async () => {
    const { data, error } = await supabase
      .from("budgets")
      .select("*")
      .eq("profile_id", user?.id ?? "")
      .eq("month", month)
      .eq("year", year)
      .single();
    if (error) throw error;
    if (data != null) {
      setBudget(data);
    }
  }, [month, user?.id, year]);

  const getExpensesCurrentMonth = useCallback(async () => {
    try {
      const { data: currentMonth, error } = await supabase
        .from("grouped_expenses_view")
        .select("*")
        .eq("profile_id", user?.id)
        .eq("month", month)
        .eq("year", year)
        .order("sum_price", { ascending: false });
      if (error) throw error;
      if (data != null) {
        setExpensesCurrentMonth(currentMonth as GroupExpense[]);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }, [user?.id]);

  const getExpensesAllMonth = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("grouped_expenses_view")
        .select("*")
        .eq("profile_id", user?.id)

        .order("sum_price", { ascending: false });
      if (error) throw error;
      if (data != null) {
        setTotalExpenses(data as GroupExpense[]);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }, [user?.id]);

  const sum = expensesCurrentMonth.reduce(
    (total: number, expense: GroupExpense) => total + (expense.sum_price ?? 0),
    0
  );

  const left = (budget?.budget ?? 0) - sum;

  const lastMonthExpenses = totalExpenses.filter((expense) => {
    return (
      expense.month === parseInt(month) - 1 && expense.year === parseInt(year)
    );
  });
  const lastMonthSum = lastMonthExpenses.reduce(
    (total: number, expense: GroupExpense) => total + (expense.sum_price ?? 0),
    0
  );

  const diffFromLastMonth = sum - lastMonthSum;

  let formattedDiff = "";

  if (diffFromLastMonth !== 0 && lastMonthSum !== 0) {
    const diffFromLastMonthPercentage =
      (diffFromLastMonth / lastMonthSum) * 100;

    let diff = Number(diffFromLastMonthPercentage.toFixed(0));

    formattedDiff = diff.toString();
    if (diffFromLastMonth === 0) {
      formattedDiff = "";
    } else {
      formattedDiff = (diffFromLastMonth > 0 ? "+" : "") + diff + " %";
    }
  }

  useEffect(() => {
    if (user?.id != null) {
      getBudget();
      getExpensesCurrentMonth();
      getExpensesAllMonth();
    }
  }, [getBudget, getExpensesCurrentMonth, getExpensesAllMonth, user?.id]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        backgroundColor: "#F8D379",
        data: labels.map((label) => {
          const expensesByMonth = totalExpenses.filter((expense) => {
            return (
              expense.month === labels.indexOf(label) + 1 &&
              expense.year === parseInt(year)
            );
          });
          const totalExpenseByMonth = expensesByMonth.reduce(
            (total, expense) => {
              return total + (expense.sum_price ?? 0);
            },
            0
          );
          return totalExpenseByMonth;
        }),
      },
    ],
  };

  const handleChangeMonth = (delta: number) => {
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    date.setMonth(date.getMonth() + delta);
    const newMonth = String(date.getMonth() + 1).padStart(2, "0");
    const newYear = date.getFullYear();
    router.replace(`/${newYear}/${newMonth}/overview`);
  };

  let monthName = new Date(
    parseInt(year),
    parseInt(month) - 1,
    1
  ).toLocaleString("default", { month: "long" });

  const formattedMonthName =
    monthName.charAt(0).toUpperCase() + monthName.slice(1);

  return (
    <main className={styles.main}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <>
          <CustomIconButton
            value={`${year}/${month}`}
            size="small"
            sx={{ background: "#9747FF", color: "white" }}
            onClick={() => handleChangeMonth(-1)}
          >
            <KeyboardArrowLeftIcon />
          </CustomIconButton>
        </>
        {formattedMonthName} {year}
        <>
          <CustomIconButton
            onClick={() => handleChangeMonth(1)}
            size="small"
            value={`${year}/${month}`}
            sx={{ background: "#9747FF", color: "white" }}
          >
            <KeyboardArrowRightIcon />
          </CustomIconButton>
        </>
      </div>

      <>Overview</>

      <div style={{ background: "pink", color: "white" }}>
        <div style={{ background: "pink", color: "white" }}>
          {budget !== null ? (
            <p> {budget?.budget}</p>
          ) : (
            <>
              <p>Set your budget</p>
              <CustomButton
                text="Add budget"
                onClick={() => router.push(`/${year}/${month}/addbudget`)}
              />
            </>
          )}
        </div>
      </div>

      <>
        <div
          style={{ background: "#2B2C4B" }}
          onClick={() =>
            router.push(
              `/${budget?.year ?? year}/${budget?.month ?? month}/expenses`
            )
          }
          role="button"
          className="button"
        >
          <h2>Expenses</h2>

          <>
            <p>This month you have spend {sum}kr</p>
          </>
          <p>Left {left} kr</p>
        </div>
      </>

      <>Förra månaden månaden spenderade du {lastMonthSum} kr</>
      <p> {formattedDiff} </p>

      <Bar
        options={options}
        data={data}
        style={{ background: "#2B2C4B", color: "white", borderRadius: "12px" }}
      />

      <CustomButton
        href={`/${year}/${month}/addbudget`}
        size="small"
        variant="contained"
        text="Add Budget"
      />
    </main>
  );
}
