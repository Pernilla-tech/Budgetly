"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginForm = () => {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();

  // Check if there is a user

  console.log(router);
  console.log(user);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  console.log({ user });

  return (
    <div>
      <div>
        <div>
          <h1>Login</h1>
          <br />
          <p>
            Welcome to <span>Budgetly</span>
          </p>
        </div>
        <br />

        <button onClick={signInWithGoogle}>Login with Google</button>
      </div>
    </div>
  );
};

export default LoginForm;
