import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.box}>
      No pages was found. Please, go to the
      <Link to="/">
        <button className={styles.btn}>Home page</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
