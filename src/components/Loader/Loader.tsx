import React from "react";
import styles from "./Loader.module.css";
import { DNA } from "react-loader-spinner";

type LoaderProps = {
  isLoading: boolean;
};
const Loader: React.FC<LoaderProps> = (isLoading) => {
  return (
    <div>
      <div className={styles.loader}>
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </div>
  );
};

export default Loader;
