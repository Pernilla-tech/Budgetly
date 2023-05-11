import { Metadata } from "next";
import LoginForm from "./components/loginform/loginForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to Budgetly",
};

const LoginPage = () => {
  return (
    <div className={styles.main}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
