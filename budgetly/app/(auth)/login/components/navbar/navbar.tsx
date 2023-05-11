import React from "react";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.navbarlinks}>
          <a href="/">Log in</a>
          <a href="/login/about">About</a>
          {/* <a href="/login/contact">Contact</a> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
