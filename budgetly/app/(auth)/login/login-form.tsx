"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CustomButton from "@/components/components/ui/CustomButton";

const LoginForm = () => {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  console.log({ user });

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <p className={styles.description}>
          Welcome to <span>Budgetly</span>
        </p>
        <div className={styles.loginbutton}>
          <CustomButton
            text="Login with Google"
            onClick={() => signInWithGoogle()}
            variant="contained"
            size="large"
          />
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
