import { Database } from "./supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Expense = Database["public"]["Tables"]["expenses"]["Row"];
