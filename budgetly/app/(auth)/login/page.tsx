"use client";

import LoginForm from "./components/loginform/loginForm";
import styles from "./page.module.css";

import SparklesComponent from "./components/sparkles/sparkles";
import { Overlay } from "./components/overlay/overlay";

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
