// import { createClient } from "@/components/utils/supabase-server";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const supabase = createClient();

//   // Fetch the Current User
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   // If there is no user, return 401 Unauthorized
//   if (!session) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   // Fetch expenses for the current user
//   const { data: posts, error } = await supabase
//     .from("expenses")
//     .select("*")
//     .eq("id", session?.user.id);

//   if (error) {
//     return new Response(error.message, { status: 500 });
//   }

//   return NextResponse.json(posts);
// }
