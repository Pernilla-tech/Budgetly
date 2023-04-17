import React from "react";
import styles from "./page.module.css";
import Products from "./products/page";

const Shopping = () => {
  return (
    <div className={styles.main}>
      Shopping
      <Products />
    </div>
  );
};

export default Shopping;
