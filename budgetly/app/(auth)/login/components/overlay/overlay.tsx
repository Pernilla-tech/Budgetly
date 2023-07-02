import React from "react";
import { LoginpageSvg } from "@/components/public/LoginpageSvg";
import styles from "./overlay.module.css";

export const Overlay = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate3d(-50%,-50%,0)",
        }}
      >
        <div className={styles.info}>
          <div className={styles.logo}>
            <LoginpageSvg />
          </div>
          <div className={styles.description}>
            <h1>Budgetly</h1>
            <p>
              Budgetly is a user-friendly and intuitive budget app that helps
              you to manage your finances and expenses in a simple way.
            </p>

            <p>Budgetly will help you take control over your finances.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
