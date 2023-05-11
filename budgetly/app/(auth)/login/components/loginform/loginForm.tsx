"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import styles from "./loginform.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CustomButton from "@/components/components/ui/CustomButton";
import { LoginpageSvg } from "@/components/public/LoginpageSvg";

const LoginForm = () => {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.logo}>
            <LoginpageSvg />
          </div>
          <div className={styles.description}>
            <h1>Welcome to Budgetly</h1>
            <p>
              Budgetly is a user-friendly and intuitive budget app that helps
              you to manage your finances and expenses in a simple way.
            </p>

            <p>Budgetly will help you take control over your finances.</p>
          </div>
        </div>

        <div className={styles.login}>
          <span className={styles.description}>
            <h1>User login</h1>
          </span>

          <CustomButton
            className={styles.loginbutton}
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
