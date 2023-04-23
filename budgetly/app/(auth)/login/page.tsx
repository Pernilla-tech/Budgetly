import LoginForm from "./login-form";
import styles from "./page.module.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to Budgetly",
};

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
