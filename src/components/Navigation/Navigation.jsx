import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

{
  /* змінювати юрл */
}
const Navigation = () => {
  return (
    <div>
      <header className={styles.header}>
        {" "}
        <nav className={styles.nav}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={buildLinkClass}>
            MoviesPage
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Navigation;
