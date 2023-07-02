"use client";

import { useAuth } from "@/components/components/providers/supabase-auth-provider";
import styles from "./loginform.module.css";
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

  return (
    <>
      <div className={styles.login}>
        <h1>User login</h1>
        <CustomButton
          className={styles.loginbutton}
          text="Login with Google"
          onClick={() => signInWithGoogle()}
          variant="contained"
          size="large"
        />
      </div>
    </>
  );
};

export default LoginForm;
