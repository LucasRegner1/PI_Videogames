import React from "react";
import { getByName } from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import s from "../SearchBar/SearchBar.module.css";

function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await dispatch(getByName(name));
    name.length && setCurrentPage(1);
  };

  return (
    <div className={s.searchbar}>
      <input
        className={s.searchbar__input}
        type="text"
        placeholder="Buscar..."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type="submit"
        className={s.searchbar__button}
        onClick={(e) => handleClick(e)}
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
