"use client";

import React, {
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./page.module.css";
import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import supabase from "@/components/lib/supabase-client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Expense, GroupExpense } from "@/components/types/collection";
import { useRouter } from "next/navigation";
import CustomIconButton from "@/components/components/ui/CustomIconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CustomButton from "@/components/components/ui/CustomButton";
import CustomSelect from "@/components/components/ui/CustomSelect";
import CustomInput from "@/components/components/ui/CustomInput";

import CustomLinearProgress from "@/components/components/ui/CustomLinearProgress";
import ExpensesAccordion from "./components/ExpensesAccordion";

ChartJS.register(ArcElement, Tooltip, Legend); // register the chart.js plugins

type Params = {
  params: {
    month: string;
    year: string;
  };
};

const Expenses = ({ params: { month, year } }: Params) => {
  const [expense, setExpense] = useState<Expense[]>([]);
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);

  const [groupedExpenses, setGroupedExpenses] = useState<GroupExpense[]>([]);
  const [budget, setBudget] = useState(0);

  console.log(groupedExpenses);
  const { user } = useAuth();
  const router = useRouter();

  const getGroupedExpenses = useCallback(async () => {
    try {
      const { data: groupedData, error: groupedDataError } = await supabase
        .from("grouped_expenses_view")
        .select("*")
        .eq("profile_id", user?.id)
        .eq("month", month)
        .eq("year", year)
        .order("sum_price", { ascending: false });
      if (groupedDataError) throw groupedDataError;
      if (groupedData != null) {
        setGroupedExpenses(groupedData as GroupExpense[]);
      }

      const { data: expensesData, error: expensesDataError } = await supabase
        .from("expenses")
        .select("*")
        .eq("profile_id", user?.id)
        .eq("month", month)
        .eq("year", year);

      if (expensesDataError) throw expensesDataError;
      if (expensesData != null) {
        setExpense(expensesData as Expense[]);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }, [user?.id, setGroupedExpenses, setExpense, year, month]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("expenses")
        .insert({
          category,
          month: parseInt(month, 10),
          year: parseInt(year, 10),
          item,
          price,
          quantity: 1,
          profile_id: user?.id ?? "",
        })
        .single();

      if (error) throw error;
      getGroupedExpenses();
    } catch (error: any) {
      alert(error.message);
    }

    setCategory("");
    setItem("");
    setPrice(0);
  };

  console.log({ expense });

  const getBudget = useCallback(async () => {
    const { data, error } = await supabase
      .from("budgets")
      .select("*")
      .eq("profile_id", user?.id ?? "")
      .eq("year", year)
      .eq("month", month)
      .single();
    if (error) throw error;
    if (data != null) {
      setBudget(data.budget);
    }
  }, [user?.id, setBudget, month, year]);

  useEffect(() => {
    if (user?.id != null && month != null && year != null) {
      getGroupedExpenses();
      getBudget();
    }
  }, [getBudget, getGroupedExpenses, user?.id, month, year]);

  const deleteGroupedExpenses = async (category: string | null) => {
    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("profile_id", user?.id)
        .eq("category", category)
        .eq("month", parseInt(month, 10))
        .eq("year", parseInt(year, 10));
      if (error) throw error;

      getGroupedExpenses();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const totalExpenses = groupedExpenses.reduce(
    (total: number, expense: GroupExpense) => {
      return total + (expense.sum_price ?? 0);
    },
    0
  );

  const left = budget - totalExpenses;

  const expenseData = {
    labels: groupedExpenses.map(
      (expense: GroupExpense) => expense.group_category
    ),

    datasets: [
      {
        label: "total expenses",
        data: groupedExpenses.map((expense: GroupExpense) => expense.sum_price),

        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(235, 54, 184, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(235, 54, 184, 1)",
        ],
      },
    ],
  };

  const optionsYearMonth = [
    { value: "2023/1", label: "Januari" },
    { value: "2023/2", label: "Februari" },
    { value: "2023/3", label: "March" },
    { value: "2023/4", label: "April" },
    { value: "2023/5", label: "May" },
    { value: "2023/6", label: "Juni" },
    { value: "2023/7", label: "July" },
    { value: "2023/8", label: "August" },
    { value: "2023/9", label: "September" },
    { value: "2023/10", label: "October" },
    { value: "2023/11", label: "November" },
    { value: "2023/12", label: "December" },
  ];

  const optionsCategory = [
    { value: "", label: "Category" },
    { value: "entertaintment", label: "Entertaintment" },
    { value: "food", label: "Food" },
    { value: "housing", label: "Housing" },
    { value: "insurance", label: "Insurance" },
    { value: "other", label: "Other" },
    { value: "personal", label: "Personal" },
    { value: "saving", label: "Saving" },
    { value: "transportation", label: "Transportation" },
  ];

  const handleChangeMonth = (delta: number) => {
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    date.setMonth(date.getMonth() + delta);
    const newMonth = String(date.getMonth() + 1).padStart(2, "0");
    const newYear = date.getFullYear();
    router.replace(`/${newYear}/${newMonth}/expenses`);
  };

  const percentageUsed = (totalExpenses / budget) * 100;

  const moneyOverBudget = budget - totalExpenses;
  const overBudget = Math.abs(moneyOverBudget);

  const moneyBelowBudget = totalExpenses - budget;
  const belowBudget = Math.abs(moneyBelowBudget);

  return (
    <main className={styles.main}>
      <div className={styles.buttonWrapper}>
        <>
          <CustomIconButton
            className={styles.button}
            value={`${year}/${month}`}
            size="small"
            onClick={() => handleChangeMonth(-1)}
          >
            <KeyboardArrowLeftIcon />
          </CustomIconButton>
        </>

        <>
          <CustomSelect
            className={styles.select}
            value={`${year}/${month}`}
            defaultValue={`${year}/${month}`}
            onChange={(e) => router.replace(`/${e.target.value}/expenses`)}
            options={optionsYearMonth}
          />
        </>
        <>
          <CustomIconButton
            className={styles.button}
            onClick={() => handleChangeMonth(1)}
            size="small"
            value={`${year}/${month}`}
          >
            <KeyboardArrowRightIcon />
          </CustomIconButton>
        </>
      </div>

      <div className={styles.card}>
        <div className={styles.description}>
          <h2>Expenses</h2>
        </div>
        <div className={styles.description}>
          <p>Monthly budget</p>

          {budget === 0 ? (
            <>
              <p>{budget} kr</p>
              <CustomButton
                text="Add budget"
                onClick={() => router.push(`/${year}/${month}/addbudget`)}
              />
            </>
          ) : (
            <p>{budget} kr</p>
          )}
        </div>

        <div className={styles.wrapper}>
          <div className={styles.spent}>
            <p>Spent</p>
            <p className={styles.amountSpent}>{totalExpenses} kr</p>
          </div>

          <div className={styles.left}>
            <p>Left</p>
            <p className={styles.amountLeft}>{left} kr</p>
          </div>
        </div>

        <CustomLinearProgress
          variant="determinate"
          value={percentageUsed}
          color={percentageUsed > 100 ? "secondary" : "primary"}
        />

        <div className={styles.budgetOverview}>
          {percentageUsed > 100 ? (
            <>
              <p className={styles.overBudget}>{overBudget} kr</p>
              <p>over budget</p>
            </>
          ) : (
            <>
              <p className={styles.belowBudget}>{belowBudget} kr</p>
              <p>below budget</p>
            </>
          )}
        </div>

        <form onSubmit={onSubmit}>
          <div className={styles.formContainer}>
            <CustomInput
              className={styles.formInput}
              type="text"
              placeholder="Expense"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <CustomInput
              placeholder="Price"
              className={styles.formInput}
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <CustomSelect
              value={category}
              className={styles.formSelect}
              displayEmpty
              onChange={(e) => setCategory(e.target.value.toString())}
              options={optionsCategory}
            />

            <CustomButton type="submit" text="Add" />
          </div>
        </form>

        <>
          <Doughnut
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            data={expenseData}
          />
        </>

        <div className={styles.expensesWrapper}>
          {groupedExpenses.map((expenses: GroupExpense) => {
            return (
              <div
                key={expenses.group_category}
                className={styles.categoryCard}
              >
                {expenseData.labels.map((label) => {
                  if (label === expenses.group_category) {
                    return (
                      <div
                        className={styles.chartLegend}
                        key={label}
                        style={{
                          backgroundColor:
                            expenseData.datasets[0].backgroundColor[
                              expenseData.labels.indexOf(label)
                            ],
                        }}
                      ></div>
                    );
                  }
                })}
                <div className={styles.accordion}>
                  <ExpensesAccordion
                    deleteGroupedExpenses={deleteGroupedExpenses}
                    expense={expense}
                    expenseCategory={expenses.group_category}
                    expenseSum={expenses.sum_price}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Expenses;
