import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterByGenre,
  getGenres,
  filterByRating,
  sortByName,
  getById,
  filterNew,
  filterApiDb,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import Page from "../Page/Page";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("");
  const genres = useSelector((state) => state.genres);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const page = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  };

  const handleSortByName = (e) => {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleSortByRating = (e) => {
    e.preventDefault();
    dispatch(filterByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleFilterByGenre = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleFilterApiDb = (e) => {
    e.preventDefault();
    dispatch(filterApiDb(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleClickNew = (e) => {
    e.preventDefault();
    dispatch(filterNew(e));
    setCurrentPage(1);
  };

  return (
    <div className="containerHome">
      <h1>The Gamers' Hub, all you need!</h1>
      <div className="headerContainer">
        <Link to="/form">
          <button className="createButton">Crear videojuego</button>
        </Link>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Recarga los videojuegos
        </button>
        <button className="filterNew" onClick={(e) => handleClickNew(e)}>
          Filter
        </button>
      </div>

      <div classname="allSelect" onChange={(e) => handleSortByName(e)}>
        <select className="select">
          <option value="-">-</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <select className="select" onChange={(e) => handleSortByRating(e)}>
          <option value="-">-</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select className="select" onChange={(e) => handleFilterApiDb(e)}>
          <option value="all">Todo</option>
          <option value="db">Data Base</option>
          <option value="api">Api</option>
        </select>
        <select className="select" onChange={(e) => handleFilterByGenre(e)}>
          <option value="All">Todo</option>
          {genres.map((g) => (
            <option key={g.id} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <SearchBar setCurrentPage={setCurrentPage} />

      <div className="cards">
        {currentGames?.map((e) => {
          return (
            <Link key={e.id} to={`/videogames/${e.id}`}>
              <Card
                name={e.name}
                image={e.image}
                genres={e.genres}
                rating={e.rating}
              />
            </Link>
          );
        })}
      </div>

      <div className="page">
        <Page
          gamesPerPage={gamesPerPage}
          allVideogames={allVideogames.length}
          page={page}
        />
      </div>
    </div>
  );
}
