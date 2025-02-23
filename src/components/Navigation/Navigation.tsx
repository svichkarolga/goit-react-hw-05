import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }: { isActive: boolean }) => {
  return clsx(styles.link, isActive && styles.active);
};

const Navigation: React.FC = () => {
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
