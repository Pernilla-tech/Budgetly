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
import { GroupExpense } from "@/components/types/collection";
import { useRouter } from "next/navigation";
import CustomIconButton from "@/components/components/ui/CustomIconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CustomButton from "@/components/components/ui/CustomButton";
import CustomSelect from "@/components/components/ui/CustomSelect";
import CustomInput from "@/components/components/ui/CustomInput";

ChartJS.register(ArcElement, Tooltip, Legend); // register the chart.js plugins

type Params = {
  params: {
    month: string;
    year: string;
  };
};

const Expenses = ({ params: { month, year } }: Params) => {
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);

  const [groupedExpenses, setGroupedExpenses] = useState<GroupExpense[]>([]);
  const [budget, setBudget] = useState(0);
  // const [selectedDate, setSelectedDate] = useState(new Date().getMonth());

  const { user } = useAuth();
  const router = useRouter();

  const getExpenses = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("grouped_expenses_view")
        .select("*")
        .eq("profile_id", user?.id)
        .eq("month", month)
        .eq("year", year)
        .order("sum_price", { ascending: false });
      if (error) throw error;
      if (data != null) {
        setGroupedExpenses(data as GroupExpense[]);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }, [user?.id, setGroupedExpenses, year, month]);

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
      getExpenses();
    } catch (error: any) {
      alert(error.message);
    }
    setCategory("");
    setItem("");
    setPrice(0);
  };

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
      getExpenses();
      getBudget();
    }
  }, [getBudget, getExpenses, user?.id, month, year]);

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
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(235, 54, 184, 0.2)",
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
        borderWidth: 1,
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

        <>
          <CustomSelect
            value={`${year}/${month}`}
            defaultValue={`${year}/${month}`}
            onChange={(e) => router.replace(`/${e.target.value}/expenses`)}
            options={optionsYearMonth}
          />
        </>
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

      <div className={styles.cointainer}>
        <div className={styles.description}>Expenses</div>
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
          <>
            <p className={styles.spent}>Spent</p>
            <p className={styles.spent}>{totalExpenses} kr</p>
          </>

          <>
            <p className={styles.left}>Left</p>
            <p className={styles.left}>{left} kr</p>
          </>
        </div>

        <>
          <form onSubmit={onSubmit}>
            <CustomInput
              type="text"
              placeholder="Expense"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <CustomInput
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <CustomSelect
              value={category}
              onChange={(e) => setCategory(e.target.value.toString())}
              options={optionsCategory}
            />

            <CustomButton type="submit" text="Add" />
          </form>
        </>

        <div style={{ width: "300px" }}>
          <Doughnut
            data={expenseData}
            style={{ width: "300px", height: "250px" }}
          />
        </div>

        <div style={{ width: "300px" }}>
          {groupedExpenses.map((expense: GroupExpense) => {
            return (
              <div key={expense.group_category}>
                <>
                  {expenseData.labels.map((label) => {
                    if (label === expense.group_category) {
                      return (
                        <div
                          key={label}
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor:
                              expenseData.datasets[0].backgroundColor[
                                expenseData.labels.indexOf(label)
                              ],
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                        ></div>
                      );
                    }
                  })}

                  <>
                    <p>{expense.group_category}</p>
                  </>
                  <>
                    <p>{expense.sum_price} kr</p>
                  </>
                </>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Expenses;
