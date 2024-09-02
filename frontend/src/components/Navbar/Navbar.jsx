import React from "react";
import styles from "./Navbar.module.css";
import { AiFillGithub } from "react-icons/ai";
const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        RENDEVMQ
        <Button
          href="https://github.com/RendevMq"
          target="_blank"
          className="fork-btn-inner"
        >
          <AiFillGithub style={{ fontSize: "1.2em" }} />{" "}
          {/* <AiFillStar style={{ fontSize: "1.1em" }} /> */}
        </Button>
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
