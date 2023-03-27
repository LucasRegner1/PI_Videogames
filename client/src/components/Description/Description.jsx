import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../redux/actions";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import s from "../Description/Description.module.css";

function Description(prop) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getById(prop.match.params.id));
    setLoading(false);
  }, [dispatch]);

  const videogame = useSelector((state) => state.gameid);

  let genres = [];
  let platforms = [];

  if (videogame) {
    genres = videogame?.genres?.map((e) => (e.name ? e.name : e)).join(", ");
    platforms = videogame?.platforms
      ?.map((e) => (e.name ? e.name : e))
      .join(", ");
  }

  return (
    <div>
      <Link to="/videogames">
        <div>
          <Nav />
        </div>
      </Link>

      {console.log(videogame)}

      <div className={s.container}>
        <div>
          <h1 className={s.title}>DETALLES</h1>
        </div>
        {
          <div className="descriptionContainer">
            <div className="imgContainer">
              <h1 className={s.title}>{videogame.name}</h1>
              <h3 className={s.title}> ID: {videogame.id}</h3>
              <h3 className={s.title}>Popularidad: {videogame.rating}</h3>
              <h4 className={s.title}>{genres}</h4>
              <h4 className={s.title}>{platforms}</h4>
              <img
                className="imageDetail"
                src={videogame.image}
                alt={videogame.name}
              />
              <p className={s.title}>Fecha: {videogame.released}</p>
            </div>
            <div className={s.description}>
              <p>{videogame?.description?.replace(/<[^>]*>?/g, "")}</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Description;
