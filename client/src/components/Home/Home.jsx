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
  }, []);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const page = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleClick = (e) => {
    dispatch(getVideogames());
  };

  const handleSortByName = (e) => {
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleSortByRating = (e) => {
    dispatch(filterByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleFilterByGenre = (e) => {
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleFilterApiDb = (e) => {
    dispatch(filterApiDb(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  return (
    <div>
      <h1 className={s.tittle}>The Gamers' Hub, all you need!</h1>
      <div>
        <Link to="/form">
          <button className={s.button}>Crear videojuego</button>
        </Link>
        <button
          className={s.button}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Recarga los videojuegos
        </button>
      </div>

      <div>
        <select onChange={(e) => handleSortByName(e)} className={s.select}>
          <option value="-">-</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <select className={s.select} onChange={(e) => handleSortByRating(e)}>
          <option value="-">-</option>
          <option value="Ascendente">Ascendente</option>
          <option value="Descendente">Descendente</option>
        </select>
        <select className={s.select} onChange={(e) => handleFilterApiDb(e)}>
          <option value="all">Todo</option>
          <option value="DB">Data Base</option>
          <option value="API">Api</option>
        </select>
        <select className={s.select} onChange={(e) => handleFilterByGenre(e)}>
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

      <div>
        <Page
          gamesPerPage={gamesPerPage}
          allVideogames={allVideogames.length}
          page={page}
        />
      </div>
    </div>
  );
}
