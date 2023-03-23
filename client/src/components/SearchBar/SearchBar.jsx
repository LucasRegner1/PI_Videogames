import React from "react";
import { getByName } from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";

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
    <div className="SearchBar">
      <input
        className="inputSearchbar"
        type="text"
        placeholder="Buscar..."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type="submit"
        className="searchButton"
        onClick={(e) => handleClick(e)}
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
