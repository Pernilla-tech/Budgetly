"use client";

import { Metadata } from "next";
import LoginForm from "./components/loginform/loginForm";
import styles from "./page.module.css";

import SparklesComponent from "./components/sparkles/sparkles";
import { Overlay } from "./components/overlay/overlay";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to Budgetly",
};

const LoginPage = () => {
  return (
    <div className={styles.main}>
      <Overlay />
      <div className={styles.sparklesWrapper}>
        <SparklesComponent />
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
