import { Database } from "../lib/database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Expense = Database["public"]["Tables"]["expenses"]["Row"];

//groupexpense is a view
export type GroupExpense = {
  group_category: string;
  sum_quantity: number;
  sum_price: number;
};
