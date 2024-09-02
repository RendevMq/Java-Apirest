import React from "react";
import styles from "./Navbar.module.css";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>RENDEVMQ</div>
      <div className={styles.themeSwitch}>
        <input
          type="checkbox"
          id="themeToggle"
          className={styles.toggleCheckbox}
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <label htmlFor="themeToggle" className={styles.toggleLabel}>
          <span className={styles.toggleInner}></span>
          <span className={styles.toggleSwitch}></span>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
