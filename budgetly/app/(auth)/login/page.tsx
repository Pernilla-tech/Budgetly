import LoginForm from "./login-form";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to Budgetly",
};

const LoginPage = () => {
  return (
    <div>
      <LoginForm />

      <div />
    </div>
  );
};

export default LoginPage;
