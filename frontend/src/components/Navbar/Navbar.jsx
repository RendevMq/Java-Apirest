import React from "react";
import styles from "./Navbar.module.css";
import { AiFillGithub } from "react-icons/ai";
const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        RENDEVMQ
        <a
          href="https://github.com/RendevMq/Java-Apirest"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.sourceCodeBtn}
        >
          <AiFillGithub style={{ fontSize: "1.2em" }} />
          <span className={styles.buttonText}>Source Code</span>
        </a>
      </div>
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
