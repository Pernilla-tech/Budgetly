"use client";

import React, { FormEventHandler, useEffect, useState } from "react";
import styles from "./page.module.css";
import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import supabase from "@/components/lib/supabase-client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { GroupExpense } from "@/components/types/collection";

ChartJS.register(ArcElement, Tooltip, Legend); // register the chart.js plugins

type Data = {
  color: string;
  value: number | string;
  key?: string | number;
  title?: string | number;
  [key: string]: any;
}[];

const Expenses = () => {
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [groupedExpenses, setGroupedExpenses] = useState<{
    [x: string]: any;
  }>([]); //är en arrray av objekt o varje objekt kan ha vilken egenskap som helst som key
  const [budget, setBudget] = useState(0);

  const { user } = useAuth();

  useEffect(() => {
    getExpenses();
    getBudget();
  }, []);

  const getExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from("grouped_expenses_view")
        .select("*")
        .eq("profile_id", user?.id) // TODO hämta från user (auth?)
        .order("sum_price", { ascending: false });
      if (error) throw error;
      if (data != null) {
        setGroupedExpenses(data);
        console.log(data);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const data: Data = groupedExpenses.map((expense: GroupExpense) => {
    // mappar över categoryTotalsArray och returnerar ett objekt med nycklarna title, value och color
    // [{title: "Food", value: 100, color: "#1e262f"}, {title: "Food", value: 100, color: "#1e262f"}]
    return {
      title: expense.group_category,
      value: expense.sum_price,
      color: color, // här kan vi lägga till en random color generator
    };
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("expenses")
        .insert({
          category,
          item,
          price,
          quantity: 1,
          profile_id: user?.id ?? "",
        })
        .single();

      if (data !== null) {
        getExpenses();
      }

      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
    setCategory("");
    setItem("");
    setPrice(0);
  };

  const getBudget = async () => {
    const { data, error } = await supabase
      .from("budgets")
      .select("*")
      .eq("profile_id", user?.id ?? "")

      .single();
    if (error) throw error;
    if (data != null) {
      setBudget(data.budget);
    }
  };

  const totalExpenses = groupedExpenses.reduce(
    (total: number, expense: GroupExpense) => {
      return total + expense.sum_price;
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

  console.log({ datas: expenseData });

  return (
    <main className={styles.main}>
      <div className={styles.description}>Expenses</div>

      <div className={styles.cointainer}>
        <div className={styles.description}>
          <p>Monthly budget</p>
          <p>{budget} kr</p>
        </div>

        <div className={styles.wrapper}>
          <div>
            <p className={styles.spent}>Spent</p>
            <p className={styles.spent}>{totalExpenses} kr</p>
          </div>

          <div>
            <p className={styles.left}>Left</p>
            <p className={styles.left}>{left} kr</p>
          </div>
        </div>

        <div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Expense"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <input
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="clothing">Clothing</option>
              <option value="entertainment ">Entertainment </option>
              <option value="food">Food</option>
              <option value="housing">Housing</option>
              <option value="insurance">Insurance</option>
              <option value="other">Other</option>
              <option value="personal">Personal</option>
              <option value="saving">Saving</option>
              <option value="transportation">Transportation</option>
            </select>

            <button type="submit">Add</button>
          </form>
        </div>

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
                <div>
                  {expenseData.labels.map((label: string) => {
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

                  <div>
                    <p>{expense.group_category}</p>
                  </div>
                  <div>
                    <p>{expense.sum_price} kr</p>
                  </div>
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
