import Link from "next/link";
import React from "react";
import styles from "./tabbar.module.css";

const Tabbar = () => {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <Link href="/">Overview</Link>
        </li>
        <li>
          <Link href="/shopping">Shopping</Link>
        </li>
      </ul>
    </div>
  );
};

export default Tabbar;
