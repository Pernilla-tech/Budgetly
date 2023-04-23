import { Database } from "./supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Expense = Database["public"]["Tables"]["expenses"]["Row"];
export type Budgets = Database["public"]["Tables"]["budgets"]["Row"];

export type GroupExpense =
  Database["public"]["Views"]["grouped_expenses_view"]["Row"];
export type GroupExpenseFood =
  Database["public"]["Views"]["grouped_food_expenses_view"]["Row"];
