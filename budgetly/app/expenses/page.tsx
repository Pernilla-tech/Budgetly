import React from "react";
import styles from "./page.module.css";

const Expenses = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>Expenses</div>

      <div className={styles.cointainer}>
        <div className={styles.description}>
          <p>Monthly budget</p>
          <p>4550 kr</p>
        </div>
        <div className={styles.wrapper}>
          <div>
            <p className={styles.spent}>Spent</p>
            <p className={styles.spent}>1550kr</p>
          </div>

          <div>
            <p className={styles.left}>Left</p>
            <p className={styles.left}>1550kr</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Expenses;
