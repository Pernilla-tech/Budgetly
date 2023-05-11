import React from "react";
import styles from "./page.module.css";
import { ContactpageSvg } from "@/components/public/ContactpageSvg";

export const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <ContactpageSvg />
      </div>
      <div className={styles.about}>
        <div className={styles.description}>
          <h1>About</h1>
          <p>
            Budgetly is a user-friendly and intuitive budget app that helps you
            to manage your finances and expenses in a simple way.
            <p>
              With Budgetly you can record your budget for each month and
              compare your expenses between months. You can also save your
              expenses in different categories to get an overview of how much
              you spend on different areas. Our app gives you an overview of
              your finances and helps you keep track of your expenses so you can
              save money and achieve your financial goals.
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
