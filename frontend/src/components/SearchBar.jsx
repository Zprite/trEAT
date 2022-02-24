import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from '../styles/Searchbar.module.css';

export default function SearchBar() {
  const [clicked, setClicked] = useState(false);
  const onClick = () => {
    setClicked(!clicked);
  };
  const completedClass = clicked ? styles.btnClicked : styles.btnUnclicked;
  return (
    <form className={styles.search}>
      <div>
        <input
          type="text"
          placeholder="Search recipes"
          name="q"
        />
        <button
          onClick={onClick}
          type="submit"
          className={`${completedClass}`}
        >
          <div>Search</div>
          <div><FaSearch id="faSearch" /></div>
        </button>
      </div>
    </form>
  );
}
