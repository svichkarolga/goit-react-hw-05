import React from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./SearchBar.module.css";

type SearchBarProp = {
  onSubmit: (topic: string) => void;
};

const SearchBar: React.FC<SearchBarProp> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const topic = (
      form.elements.namedItem("input") as HTMLInputElement
    )?.value.trim();
    if (topic === "") {
      toast.error("Please enter search term!");
      return;
    }
    onSubmit(topic);
    form.reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button className={styles.btn} type="submit">
          Search movie
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
