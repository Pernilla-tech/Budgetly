import Link from "next/link";
import React from "react";
import styles from "./TabBar.module.css";

type Params = {
  params: {
    month: string;
    year: string;
  };
};

const TabBar = ({ params: { year, month } }: Params) => {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <Link href={`/${year}/${month}/overview`}>Overview</Link>
        </li>
        <li>
          <Link href={`/${year}/${month}/shopping`}>Shopping</Link>
        </li>
      </ul>
    </div>
  );
};

export default TabBar;
