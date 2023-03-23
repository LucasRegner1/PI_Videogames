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
import s from "./Home.module.css";

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

  return (
    <div>
      <h1>The Gamers' Hub, all you need!</h1>
      <div>
        <Link to="/form">
          <button>Crear videojuego</button>
        </Link>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Recarga los videojuegos
        </button>
      </div>

      <div onChange={(e) => handleSortByName(e)}>
        <select className="select">
          <option value="-">-</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <select className="select" onChange={(e) => handleSortByRating(e)}>
          <option value="-">-</option>
          <option value="ascendente">Ascendente</option>
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

      <section>
        <div className={s.cards}>
          {currentGames?.map((e) => {
            return (
              <Link key={e.id} to={`/videogames/${e.id}`}>
                <Card
                  name={e.name}
                  image={e.background_image}
                  genres={e.genres}
                  rating={e.rating}
                />
              </Link>
            );
          })}
        </div>
      </section>

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
